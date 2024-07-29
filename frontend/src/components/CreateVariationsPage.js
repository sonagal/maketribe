import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateVariationsPage.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const CreateVariationsPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [error, setError] = useState('');

  const handleModifyExistingDesign = () => {
    navigate('/modify-existing-design');
  };

  const handleCreateNewDesign = () => {
    navigate('/');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'image/png') {
        setError('Please upload a PNG image.');
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        setError('Please upload an image less than 4 MB.');
        return;
      }
      setSelectedImage(file);
      setError('');
    }
  };

  const handleCreateVariation = async () => {
    if (!selectedImage) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:8000/create-variation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setGeneratedImageUrl(response.data.image_url);
    } catch (error) {
      console.error('Error creating variation:', error);
      setError('An error occurred while creating the variation.');
    }
  };

  const handleRetry = () => {
    handleCreateVariation();
  };

  return (
    <div className="create-variations-page">
      <Header />
      <main className="main-content">
        <div className="tabs">
          <button className="tab active">Design Lab</button>
          <button className="tab">Products Catalog</button>
        </div>
        <div className="sub-tabs">
          <button className="sub-tab active">Create variations of existing design</button>
          <button className="sub-tab" onClick={handleModifyExistingDesign}>Modify existing design</button>
          <button className="sub-tab" onClick={handleCreateNewDesign}>Create new design</button>
        </div>
        <div className="design-form">
          <p className="instructions">
            Here you can create modified versions of your existing product designs. You can upload here the image of your unsold inventory and our AI tool will suggest a new design with which you can upcycle your product.
          </p>
          <div className="upload-section">
            <input type="file" className="select-images-button" onChange={handleImageUpload} />
            <button className="select-image-button">Select an image from products</button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="create-design-button" onClick={handleCreateVariation}>Create the new versions</button>
        </div>
        {generatedImageUrl && (
          <div className="preview-section">
            <img src={generatedImageUrl} alt="AI Generated" className="preview-image" />
            <div className="edit-section">
              <p>Would you like to edit this design?</p>
              <button className="edit-button">Edit in Design editor</button>
            </div>
            <button className="continue-button">Continue</button>
            <div className="retry-section">
              <button className="retry-button" onClick={handleRetry}>Retry</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CreateVariationsPage;
