const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Use CORS to allow requests from your frontend
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Endpoint to handle DALL-E API requests
app.post('/api/edit-image', async (req, res) => {
  const { image, mask, prompt } = req.body;

  try {
    const response = await axios.post(
      process.env.DALLE_API_URL,
      { image, mask, prompt },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${process.env.DALLE_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit image' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
