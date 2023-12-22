const express = require("express");
const router = express.Router();
const upload = require('../config/multerConfig');
const VideoController = require("../controllers/VideoController");


// Endpoint untuk mendapatkan semua video
router.get('/', VideoController.getAllVideos);

// Endpoint untuk membuat video baru
router.post('/',upload.single('image'), VideoController.createVideo);

// Endpoint untuk mendapatkan detail video berdasarkan ID
router.get('/:videoId', VideoController.getVideoById);
// Endpoint untuk menghapus video berdasarkan ID
router.delete('/:videoId', VideoController.deleteVideoById);

// Endpoint untuk memperbarui video berdasarkan ID
router.put('/:videoId', VideoController.updateVideoById);

module.exports = router;