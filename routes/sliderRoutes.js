const express = require("express");
const router = express.Router();
const SliderController = require("../controllers/SliderController");

// Endpoint untuk mendapatkan semua slider
router.get('/', SliderController.getAllSliders);

// Endpoint untuk membuat slider baru
router.post('/', SliderController.createSlider);

// Endpoint untuk mendapatkan detail slider berdasarkan ID
router.get('/:sliderid', SliderController.getSliderById);
// Endpoint untuk menghapus slider berdasarkan ID
router.delete('/:sliderid', SliderController.deleteSliderById);

// Endpoint untuk memperbarui slider berdasarkan ID
router.put('/:sliderid', SliderController.updateSliderById);

module.exports = router;