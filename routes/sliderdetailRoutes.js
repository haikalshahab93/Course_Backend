const express = require("express");
const router = express.Router();
const SliderDetailController = require("../controllers/SliderDetailController");


// Endpoint untuk mendapatkan semua slider detail
router.get('/', SliderDetailController.getAllSliderDetails);

// Endpoint untuk membuat slider detail baru
router.post('/', SliderDetailController.createSliderDetail);

// Endpoint untuk mendapatkan detail slider berdasarkan ID
router.get('/:sliderid', SliderDetailController.getSliderDetailsBySliderId);
// Endpoint untuk menghapus slider detail berdasarkan ID
router.delete('/:sliderid', SliderDetailController.deleteSliderDetail);

// Endpoint untuk memperbarui slider detail berdasarkan ID
router.put('/:sliderid', SliderDetailController.updateSliderDetail);

module.exports = router;