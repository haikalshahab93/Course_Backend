const express = require("express");
const router = express.Router();
const SliderController = require("../controllers/SliderController");

router.post("/", SliderController.createSlider);
router.get("/", SliderController.getAllSliders);
// router.get("/", ProfileController.getProfileById);
// router.get("/:profileRequestId", ProfileController.getProfileById);
// router.put("/:profileRequestId", ProfileController.updateProfileById);
// router.delete("/:profileRequestId",ProfileController.deleteProfileById);

// router.put(
//   "/:profileRequestId/status",
//   ProfileController.update status
// );

module.exports = router;