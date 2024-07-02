from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os
import logging
import torch
from PIL import Image, UnidentifiedImageError
from torchvision.models import vgg19
from torchvision import transforms
from transformers import BlipProcessor, BlipForConditionalGeneration
import uuid
import shutil
from io import BytesIO
import aiofiles

app = FastAPI()

# Load environment variables from .env file
_ = load_dotenv(find_dotenv())

client = OpenAI(
  api_key=os.environ['OPENAI_API_KEY'],  # this is also the default, it can be omitted
)
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3003",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load VGG19 model
vgg = vgg19(pretrained=True).features
for param in vgg.parameters():
    param.requires_grad = False

# Function to load an image from path and transform it
def load_image_from_path(img_path, max_size=400, shape=None):
    try:
        logging.info(f"Loading image from path: {img_path}")
        image = Image.open(img_path).convert('RGB')
        if max_size:
            size = max(max_size, max(image.size))
            if shape:
                size = shape
            in_transform = transforms.Compose([
                transforms.Resize(size),
                transforms.ToTensor(),
                transforms.Normalize((0.485, 0.456, 0.406),
                                     (0.229, 0.224, 0.225))])
            image = in_transform(image)[:3, :, :].unsqueeze(0)
        return image
    except UnidentifiedImageError as e:
        logging.error(f"UnidentifiedImageError: {e}")
        raise HTTPException(status_code=400, detail=f"Cannot identify image file at path: {img_path}")

# Function to get features from VGG19
def get_features(image, model, layers=None):
    if layers is None:
        layers = {'0': 'conv1_1', '5': 'conv2_1',
                  '10': 'conv3_1', '19': 'conv4_1',
                  '21': 'conv4_2', '28': 'conv5_1'}
    features = {}
    x = image
    for name, layer in model._modules.items():
        x = layer(x)
        if name in layers:
            features[layers[name]] = x
    return features

# Function to calculate Gram matrix
def gram_matrix(tensor):
    _, d, h, w = tensor.size()
    tensor = tensor.view(d, h * w)
    gram = torch.mm(tensor, tensor.t())
    return gram

# Function to describe styles based on Gram matrices
def describe_styles(avg_grams):
    descriptions = []
    for layer, gram_matrix in avg_grams.items():
        if layer == 'conv1_1':
            descriptions.append("basic textures and color patterns")
        elif layer == 'conv2_1':
            descriptions.append("early shapes and simple color gradients")
        elif layer == 'conv3_1':
            descriptions.append("more complex patterns and details")
        elif layer == 'conv4_1':
            descriptions.append("detailed features and intricate designs")
        elif layer == 'conv5_1':
            descriptions.append("high-level style and artistic elements")
    return descriptions

# Function to craft the prompt
def craft_prompt(image_descriptions, style_descriptions, prompt=''):
    if prompt == '':
        pre_prompt = ''
    else:
        pre_prompt = 'of'

    prompt = f"Generate a realistic image with a white background {pre_prompt} {prompt} that combines the average style of the following images:\n"
    for i, desc in enumerate(image_descriptions, 1):
        prompt += f"{i}. {desc}\n"
    prompt += "\nThe new image should reflect the combined styles by blending:\n"
    prompt += ", ".join(style_descriptions) + "Everything on the image should look realistic" + "!"
    return prompt

@app.post("/create-design")
async def create_design(
    prompt: str = Form(...),
    images: List[UploadFile] = File(None)
):
    session_id = str(uuid.uuid4())
    temp_dir = os.path.join("temp_images", session_id)
    os.makedirs(temp_dir, exist_ok=True)
    temp_image_paths = []

    try:
        if not images:
            response = client.images.generate(
                prompt=prompt,
                n=1,
                size="1024x1024"
            )
            image_url = response.data[0].url
        else:
            # Save images to temp folder
            for img in images:
                temp_image_path = os.path.join(temp_dir, f"{uuid.uuid4()}.png")
                with open(temp_image_path, "wb") as f:
                    shutil.copyfileobj(img.file, f)
                temp_image_paths.append(temp_image_path)
                logging.info(f"Saved image to {temp_image_path}")

            loaded_images = [load_image_from_path(img_path) for img_path in temp_image_paths]
            image_features = [get_features(img, vgg) for img in loaded_images]
            style_layers = ['conv1_1', 'conv2_1', 'conv3_1', 'conv4_1', 'conv5_1']

            def average_grams(features_list):
                avg_grams = {}
                for layer in style_layers:
                    gram_sum = sum(gram_matrix(features[layer]) for features in features_list)
                    avg_grams[layer] = gram_sum / len(features_list)
                return avg_grams

            avg_grams = average_grams(image_features)
            style_descriptions = describe_styles(avg_grams)

            processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
            model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

            def generate_image_description(image_path):
                image = Image.open(image_path).convert('RGB')
                inputs = processor(image, return_tensors="pt")
                out = model.generate(**inputs)
                description = processor.decode(out[0], skip_special_tokens=True)
                return description

            image_descriptions = [generate_image_description(img_path) for img_path in temp_image_paths]
            crafted_prompt = craft_prompt(image_descriptions, style_descriptions, prompt=prompt)

            response = client.images.generate(
                model="dall-e-3",
                prompt=crafted_prompt,
                size="1024x1024",
                n=1
            )

            image_url = response.data[0].url

        return {"image_url": image_url}
    except Exception as e:
        logging.error(f"Error creating design: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up temp files
        shutil.rmtree(temp_dir)
        logging.info(f"Deleted temp directory: {temp_dir}")


@app.post("/edit-image")
async def edit_image(prompt: str = Form(...), image: UploadFile = File(...), mask: UploadFile = File(...)):
    try:
        # Create a unique directory for this request
        unique_id = str(uuid.uuid4())
        temp_dir = f"temp_image_edit/{unique_id}"
        os.makedirs(temp_dir, exist_ok=True)

        # Save the uploaded image and mask temporarily
        image_path = os.path.join(temp_dir, "temp_image.png")
        mask_path = os.path.join(temp_dir, "temp_mask.png")

        async with aiofiles.open(image_path, 'wb') as out_file:
            image_data = await image.read()
            await out_file.write(image_data)

        async with aiofiles.open(mask_path, 'wb') as out_file:
            mask_data = await mask.read()
            await out_file.write(mask_data)

        # Use OpenAI API to edit the image
        response = client.images.edit(
            model="dall-e-2",
            image=open(image_path, "rb"),
            mask=open(mask_path, "rb"),
            prompt=prompt,
            n=1,
            size="1024x1024"
        )

        # Get the generated image URL
        image_url = response.data[0].url

        # Remove the temporary files
        os.remove(image_path)
        os.remove(mask_path)
        os.rmdir(temp_dir)

        return {"editedImageUrl": image_url}
    except Exception as e:
        return {"error": str(e)}