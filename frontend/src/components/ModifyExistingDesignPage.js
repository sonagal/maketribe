import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import useImage from './useImage';
import Header from './Header';
import Footer from './Footer';
import './ModifyExistingDesignPage.css';

const ModifyExistingDesignPage = () => {
  const [mode, setMode] = useState(null); // 'create' or 'edit'
  const [image, setImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 800, height: 600 });
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(10);
  const [loading, setLoading] = useState(false);
  const [editGeneratedImage, setEditGeneratedImage] = useState(false);
  const fileInputRef = useRef(null);
  const stageRef = useRef(null);

  const navigate = useNavigate(); // useNavigate hook

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob.size < 4 * 1024 * 1024) { // Check if the image is less than 4MB
            setImage(URL.createObjectURL(blob));
          } else {
            console.error('Image is larger than 4MB.');
          }
        }, 'image/png'); // Convert to PNG
      };
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = () => {
    setIsDrawing(true);
    const pos = stageRef.current.getPointerPosition();
    setLines([...lines, { tool: 'eraser', points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = () => {
    if (!isDrawing) return;
    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleEditDesign = async () => {
    if (!image || !prompt) return;

    setLoading(true);

    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = imageDimensions.width;
    maskCanvas.height = imageDimensions.height;
    const ctx = maskCanvas.getContext('2d');

    // Draw the original image first
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image;
    await new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        resolve();
      };
    });

    // Set the global composite operation to make the lines transparent
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.points[0], line.points[1]);
      for (let i = 2; i < line.points.length; i += 2) {
        ctx.lineTo(line.points[i], line.points[i + 1]);
      }
      ctx.stroke();
    });

    maskCanvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', await fetch(image).then(res => res.blob()), 'image.png');
      formData.append('mask', blob, 'mask.png');
      formData.append('prompt', prompt);

      try {
        const response = await axios.post('http://localhost:8000/edit-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('OpenAI response:', response.data);

        let imageUrl;
        if (response.data && response.data.editedImageUrl) {
          imageUrl = response.data.editedImageUrl;
        } else {
          throw new Error('Invalid response structure from OpenAI API');
        }

        setResultImage(imageUrl);
      } catch (error) {
        console.error('Error editing the image:', error.message);
      } finally {
        setLoading(false);
      }
    }, 'image/png');
  };

  const [loadedImage] = useImage(image);

  useEffect(() => {
    if (loadedImage) {
      setImageDimensions({ width: loadedImage.width, height: loadedImage.height });
    }
  }, [loadedImage]);

  return (
    <div className="modify-existing-design-page">
      <Header />
      <main className="main-content">
        <div className="tabs">
          <button className="tab">Design Lab</button>
          <button className="tab">Products Catalog</button>
        </div>
        <div className="sub-tabs">
          <button className="sub-tab active">Modify existing design</button>
          <button className="sub-tab" onClick={() => navigate('/')}>Create new design</button>
          <button className="sub-tab">Create variations of existing design</button>
        </div>
        <div className="edit-instructions">
          Here you can edit an existing design which you want to upcycle by uploading an image or selecting from your product catalog.
        </div>
        <div className="edit-container">
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
          <div>
            <h3>Adjust Line Width</h3>
            <input
              type="range"
              min="1"
              max="50"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
            />
            <span>{lineWidth}</span>
          </div>
          <button onClick={handleEditDesign} disabled={loading}>
            {loading ? 'Processing...' : 'Edit Design'}
          </button>
        </div>
        <div className="design-preview">
          <Stage
            width={imageDimensions.width}
            height={imageDimensions.height}
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
          >
            <Layer>
              {loadedImage && (
                <KonvaImage
                  image={loadedImage}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                />
              )}
              {lines.map((line, index) => (
                <Line
                  key={index}
                  points={line.points}
                  stroke="#000"
                  strokeWidth={lineWidth}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation="destination-out"
                />
              ))}
            </Layer>
          </Stage>
        </div>
        {resultImage && (
          <div className="design-preview">
            <h3>Generated Image:</h3>
            <img src={resultImage} alt="Generated design" />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ModifyExistingDesignPage;
