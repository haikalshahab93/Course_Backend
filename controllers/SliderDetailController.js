// controllers/sliderDetailController.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Mendapatkan semua slider details
const getAllSliderDetails = async (req, res) => {
  try {
    const sliderDetails = await prisma.sliderDetail.findMany();
    res.json(sliderDetails);
  } catch (error) {
    console.error('Error fetching slider details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendapatkan slider details berdasarkan ID slider
const getSliderDetailsBySliderId = async (req, res) => {
  const { sliderId } = req.params;
  try {
    const details = await prisma.sliderDetail.findMany({
      where: { sliderId: parseInt(sliderId) },
    });
    res.json(details);
  } catch (error) {
    console.error('Error fetching slider details by slider ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Membuat slider detail baru
const createSliderDetail = async (req, res) => {
  const { name, youtubeLink, sliderId } = req.body;
  try {
    const newSliderDetail = await prisma.sliderDetail.create({
      data: {
        name,
        youtubeLink,
        sliderId: parseInt(sliderId),
      },
    });
    res.json(newSliderDetail);
  } catch (error) {
    console.error('Error creating slider detail:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Memperbarui slider detail berdasarkan ID
const updateSliderDetail = async (req, res) => {
  const { id } = req.params;
  const { name, youtubeLink, sliderId } = req.body;
  try {
    const updatedSliderDetail = await prisma.sliderDetail.update({
      where: { id: parseInt(id) },
      data: {
        name,
        youtubeLink,
        sliderId: parseInt(sliderId),
      },
    });
    res.json(updatedSliderDetail);
  } catch (error) {
    console.error('Error updating slider detail:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menghapus slider detail berdasarkan ID
const deleteSliderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSliderDetail = await prisma.sliderDetail.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedSliderDetail);
  } catch (error) {
    console.error('Error deleting slider detail:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllSliderDetails,
  getSliderDetailsBySliderId,
  createSliderDetail,
  updateSliderDetail,
  deleteSliderDetail,
};