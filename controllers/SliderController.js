// sliderController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllSliders = async (req, res) => {
  try {
    const sliders = await prisma.slider.findMany();
    res.json(sliders);
  } catch (error) {
    console.error('Error fetching sliders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createSlider = async (req, res) => {
  const { imageUrl, name, description } = req.body;

  try {
    const newSlider = await prisma.slider.create({
      data: {
        imageUrl,
        name,
        description,
      },
    });

    res.status(201).json(newSlider);
  } catch (error) {
    console.error('Error creating slider:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllSliders,
  createSlider
 
};