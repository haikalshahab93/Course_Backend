const express = require("express");
const router = express.Router();
const ProfileController = require("../controllers/ProfileController");
const upload = require('../config/multerConfig');

// router.post("/request", ProfileController.createProfile);
// router.get("/", ProfileController.getAllProfiles);
router.get("/", ProfileController.getProfileById);
router.get("/:profileRequestId", ProfileController.getProfileById);
router.put("/:profileRequestId",upload.single('image'), ProfileController.updateProfileById);
// router.delete("/:profileRequestId",ProfileController.deleteProfileById);

// router.put(
//   "/:profileRequestId/status",
//   ProfileController.update status
// );

module.exports = router;