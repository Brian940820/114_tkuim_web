const express = require("express");
const router = express.Router();

const {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  deleteRegistration,
  getRegistrationsByCompetition
} = require("../controllers/registrationController");

router.get("/competition/:competitionId", getRegistrationsByCompetition);

router.post("/", createRegistration);
router.get("/", getRegistrations);
router.get("/:id", getRegistrationById);
router.delete("/:id", deleteRegistration);



module.exports = router;
