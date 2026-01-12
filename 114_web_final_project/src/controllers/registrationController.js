const Registration = require("../models/Registration");

// CREATE
exports.createRegistration = async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json({
      success: true,
      data: registration,
      message: "Registration created successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};

// READ ALL
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().populate("competition");
    res.json({
      success: true,
      data: registrations,
      message: "Registrations fetched successfully"
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
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).populate("competition");

    if (!registration) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Registration not found"
      });
    }

    res.json({
      success: true,
      data: registration,
      message: "Registration fetched successfully"
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
exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Registration not found"
      });
    }

    res.json({
      success: true,
      data: registration,
      message: "Registration deleted successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};

// 依比賽 ID 取得報名名單
exports.getRegistrationsByCompetition = async (req, res) => {
  try {
    const registrations = await Registration.find({
      competition: req.params.competitionId
    });

    res.json({
      success: true,
      data: registrations,
      message: "Registrations fetched successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};
