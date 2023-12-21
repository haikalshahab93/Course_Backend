// controllers/sliderController.js
const { PrismaClient } = require('@prisma/client');
const upload = require('../config/multerConfig');

const prisma = new PrismaClient();

// Mendapatkan semua slider beserta detailnya
const getAllSliders = async (req, res) => {
  try {
    const sliders = await prisma.slider.findMany({
      include: { sliderDetails: true },
    });
    res.json(sliders);
  } catch (error) {
    console.error('Error fetching sliders:', error);
    res.status(500).json({ error: 'Internal Server Errors' });
  }
};

// Membuat slider baru beserta detailnya
const createSlider = async (req, res) => {
  const { name, description, sliderDetails} = req.body;
  try { 
    if (!req.file) {
      return res.status(400).json({ error: 'Tidak ada file yang di-upload' });
    }

    const imageUrl = req.file.path;
    const newSlider = await prisma.slider.create({
      data: {
        name,
        imageUrl,
        description,
        sliderDetails: { create: sliderDetails },
      },
      include: { sliderDetails: true },
    });
    res.json(newSlider);
  } catch (error) {
    console.error('Error creating slider:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendapatkan detail slider berdasarkan ID
const getSliderById = async (req, res) => {
  const { id } = req.params;
  try {
    const slider = await prisma.slider.findUnique({
      where: { id: parseInt(id) },
      include: { sliderDetail: true },
    });
    if (!slider) {
      res.status(404).json({ error: 'Slider not found' });
    } else {
      res.json(slider);
    }
  } catch (error) {
    console.error('Error fetching slider:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menghapus slider berdasarkan ID
const deleteSliderById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSlider = await prisma.slider.delete({
      where: { id: parseInt(id) },
      include: { sliderDetail: true },
    });
    res.json(deletedSlider);
  } catch (error) {
    console.error('Error deleting slider:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Memperbarui slider berdasarkan ID
const updateSliderById = async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, description, sliderDetails } = req.body;
  try {
    const updatedSlider = await prisma.slider.update({
      where: { id: parseInt(id) },
      data: {
        name,
        imageUrl,
        description,
        sliderDetail: { update: sliderDetails },
      },
      include: { sliderDetail: true },
    });
    res.json(updatedSlider);
  } catch (error) {
    console.error('Error updating slider:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllSliders,
  createSlider,
  getSliderById,
  deleteSliderById,
  updateSliderById,
};