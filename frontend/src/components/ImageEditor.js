import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Stage, Layer, Image, Rect } from 'react-konva';
import useImage from 'use-image';

const DALL_E_API_URL = process.env.REACT_APP_DALLE_API_URL;
const DALL_E_API_KEY = process.env.REACT_APP_DALLE_API_KEY;


const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [mask, setMask] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrawStart = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.fillRect(50, 50, 100, 100); // Example: draw a rectangle as a mask
    setMask(canvas.toDataURL());
  };

  const handleEditImage = async () => {
    if (!mask || !image) return;

    try {
      const response = await axios.post('/api/edit-image', { image, mask, prompt });
      setResultImage(response.data.editedImageUrl);
    } catch (error) {
      console.error('Error editing the image:', error);
    }
  };

  const [loadedImage] = useImage(image);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <input
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {image && (
        <div>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Image image={loadedImage} />
              {/* Add Rect or other Konva components for drawing */}
              <Rect
                x={50}
                y={50}
                width={100}
                height={100}
                fill="rgba(255, 0, 0, 0.5)"
                draggable
              />
            </Layer>
          </Stage>
          <button onClick={handleDrawStart}>Draw Mask</button>
          <button onClick={handleEditImage}>Edit Image</button>
        </div>
      )}
      {resultImage && (
        <div>
          <img src={resultImage} alt="Result" />
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
