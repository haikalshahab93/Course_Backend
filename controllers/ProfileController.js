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


const getUserProfileByUserId = async (req,res) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log(userId)
    const userAndProfile = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });
    res.status(200).json({ data: userAndProfile }); 
  } catch (error) {
    throw new Error(`Error getting user and profile: ${error.message}`);
  }
};

const getProfileById = async (req, res) => {
  token  = req.headers.authorization ;
  try {
    // Verifikasi token dan dapatkan payload
    const decoded = jwt.verify(token, process.env.JWT_SIGN); // Gantilah 'your-secret-key' dengan kunci rahasia yang digunakan untuk membuat token

    // Menyimpan informasi pengguna dari token ke objek req.user untuk digunakan oleh rute berikutnya
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
// Mengupdate profil berdasarkan ID
const updateProfileById = async (req, res) => {
  const { firstName, lastName, phone, photo } = req.body
  try {
    // Temukan profil yang akan diupdate
    const existingProfile = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      profle:{
        update:{  
          firstName: firstName || existingProfile.firstName,
          lastName: lastName || existingProfile.lastName,
          phone: phone || existingProfile.phone,
          photo: photo || existingProfile.photo,
        }
      }
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
  deleteProfileById,
  getUserProfileByUserId
};