// controllers/videoController.js
const { PrismaClient } = require('@prisma/client');
const upload = require('../config/multerConfig');

const prisma = new PrismaClient();

// Mendapatkan semua video beserta detailnya
const getAllVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany({});
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videeos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Membuat video baru beserta detailnya
const createVideo = async (req, res) => {
  const { name, description} = req.body;
  try {
    if(!req.file){
    } 
    const newVideo = await prisma.video.create({
      data: {
        name,
        imageUrl,
        description,
      },
    });
    res.json(newVideo);
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendapatkan detail video berdasarkan ID
const getVideoById = async (req, res) => {
  const {videoid} = req.params;
  try {
    const video = await prisma.video.findUnique({
      where: { id: parseInt(videoid) },
    });
    if (!video) {
      res.status(404).json({ error: 'video not found' });
    } else {
      res.json(video);
    }
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Menghapus video berdasarkan ID
const deleteVideoById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteVideo = await prisma.video.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedVideo);
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Memperbarui video berdasarkan ID
const updateVideoById = async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, description } = req.body;
  try {
    const updatedVideo = await prisma.video.update({
      where: { id: parseInt(id) },
      data: {
        name,
        imageUrl,
        description,
      },
    });
    res.json(updatedVideo);
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllVideos,
  createVideo,
  getVideoById,
  deleteVideoById,
  updateVideoById,
};