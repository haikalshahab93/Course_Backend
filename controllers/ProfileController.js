const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mendapatkan semua profil
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (error) {
    console.error('Error getting profiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Membuat profil baru
const createProfile = async (req, res) => {
  const { name, email, bio } = req.body;

  try {
    const newProfile = await prisma.profile.create({
      data: {
        name,
        email,
        bio,
      },
    });

    res.json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProfileById = async (req, res) => {
  const id = req.params.profileRequestId;
  
    try {
      const userProfile = await prisma.Profile.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!userProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      res.json(userProfile);
    } catch (error) {
      console.error('Error fetching profile by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Mengupdate profil berdasarkan ID
const updateProfileById = async (req, res) => {
    const {firstName,lastName,phone,photo} = req.body
    const id  = req.params.profileRequestId;  
    console.log(req.body)
    try {
      // Temukan profil yang akan diupdate
      const existingProfile = await prisma.profile.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      
      console.log(existingProfile)
      // Jika profil tidak ditemukan, kembalikan respons 404
      if (!existingProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // Update hanya bidang yang diberikan
      const updatedProfile = await prisma.profile.update({
        where: {
          id: parseInt(id),
        },
        data: {
          firstName: firstName || existingProfile.firstName,
          lastName: lastName || existingProfile.lastName,
          phone: phone || existingProfile.phone,
          photo: photo || existingProfile.photo,
        },
      });
  
      res.json(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const deleteProfileById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Temukan profil yang akan dihapus
      const existingProfile = await prisma.profile.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      // Jika profil tidak ditemukan, kembalikan respons 404
      if (!existingProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // Hapus profil
      await prisma.profile.delete({
        where: {
          id: parseInt(id),
        },
      });
  
      res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  getAllProfiles,
  createProfile,
  updateProfileById,
  getProfileById,
  deleteProfileById
};