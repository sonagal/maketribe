from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
import os
import logging

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

@app.post("/create-design")
async def create_design(
    prompt: str = Form(...),
    images: List[UploadFile] = File(None)
):
    try:
        if not images:
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                n=1,
                size="1024x1024"
            )
            image_url = response.data[0].url  # Access attributes correctly
        else:
            pass
            # Here will be the logic for generating design using images and prompt
            # image_url = "generated_image_based_on_images_and_prompt.jpg"
        
        return {"image_url": image_url}
    except Exception as e:
        logging.error(f"Error creating design: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
