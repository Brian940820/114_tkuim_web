const Competition = require("../models/Competition");
const Registration = require("../models/Registration");

// CREATE
exports.createCompetition = async (req, res) => {
  try {
    const competition = await Competition.create(req.body);
    res.status(201).json({
      success: true,
      data: competition,
      message: "Competition created successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};

// READ ALL（⭐ 加上目前報名人數）
exports.getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();

    const result = await Promise.all(
      competitions.map(async (c) => {
        const count = await Registration.countDocuments({
          competition: c._id
        });

        return {
          ...c.toObject(),
          registeredCount: count
        };
      })
    );

    res.json({
      success: true,
      data: result,
      message: "Competitions fetched successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};

// READ ONE
exports.getCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Competition not found"
      });
    }

    res.json({
      success: true,
      data: competition,
      message: "Competition fetched successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};

// UPDATE
exports.updateCompetition = async (req, res) => {
  try {
    const competition = await Competition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!competition) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Competition not found"
      });
    }

    res.json({
      success: true,
      data: competition,
      message: "Competition updated successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};

// DELETE
exports.deleteCompetition = async (req, res) => {
  try {
    const competition = await Competition.findByIdAndDelete(req.params.id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Competition not found"
      });
    }

    res.json({
      success: true,
      data: competition,
      message: "Competition deleted successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};
