const express = require("express");
const router = express.Router();

const {
  createCompetition,
  getCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition
} = require("../controllers/competitionController");

router.post("/", createCompetition);
router.get("/", getCompetitions);
router.get("/:id", getCompetitionById);
router.put("/:id", updateCompetition);
router.delete("/:id", deleteCompetition);

module.exports = router;
