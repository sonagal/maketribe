import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './CreateNewDesignPage.css';
import axios from 'axios';

function CreateNewDesignPage() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleCreateDesign = async () => {
    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await axios.post('http://localhost:8000/create-design', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImagePreview(response.data.image_url);
    } catch (error) {
      console.error('Error creating design:', error);
    }
  };

  const handleModifyExistingDesign = () => {
    navigate('/modify-existing-design');
  };

  return (
    <div className="create-new-design-page">
      <Header />
      <main className="main-content">
        <div className="tabs">
          <button className="tab active">Design Lab</button>
          <button className="tab">Products Catalog</button>
        </div>
        <div className="sub-tabs">
          <button className="sub-tab active">Create new design</button>
          <button className="sub-tab" onClick={handleModifyExistingDesign}>Modify existing design</button>
          <button className="sub-tab">Create variations of existing design</button>
        </div>
        <div className="design-form">
          <p className="instructions">
            Here you can create new designs and test the market before you actually create these products.
            You can use the style from your previous products to create new ones by uploading up to 5 images of these products.
          </p>
          <p className="instruction-step">1. Tell us what you want to create, be as detailed as possible</p>
          <input type="text" className="input-text" placeholder="Describe your design..." value={prompt} onChange={handlePromptChange} />
          <p className="instruction-step">
            2. Upload product images here if you want to apply a particular style representing your brand to the new design.
            Our AI algorithm will retrieve the common style of the fashion items and apply it to the item you want to create.
          </p>
          <div className="upload-section">
            <input type="file" multiple onChange={handleImageUpload} className="select-images-button" />
            <button className="upload-button">Upload</button>
          </div>
          <button className="create-design-button" onClick={handleCreateDesign}>Create the Design</button>
        </div>
        {imagePreview && (
          <div className="preview-section">
            <img src={imagePreview} alt="Design Preview" className="preview-image" />
            <div className="edit-section">
              <p>Would you like to edit this design?</p>
              <button className="edit-button">Edit in Design editor</button>
            </div>
            <button className="continue-button">Continue</button>
            <div className="retry-section">
              <button className="retry-button">Retry</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default CreateNewDesignPage;
