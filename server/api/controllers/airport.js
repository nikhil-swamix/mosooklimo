import asyncHandler from "express-async-handler";
import Airport from "../models/airport.js";

// @desc    Register a new Airport
// @route   POST /api/airports
// @access  Admin
const registerAirport = asyncHandler(async (req, res) => {
  const { name, description, country } = req.body;
  const airportExist = await Airport.findOne({ name });
  if (airportExist) {
    res.status(400);
    throw new Error("Airport Name already exists");
  }
  const airport = await Airport.create({
    name,
    description,
    country,
  });

  if (airport) {
    res.status(201).json({
      _id: airport._id,
      name: airport.name,
      description: airport.description,
      country: airport.country,
      isPopular: airport.isPopular,
    });
  } else {
    res.status(400);
    throw new Error("Invalid airport data");
  }
});

// @desc    Get all airports
// @route   GET /api/airports
// @access  Public
const getAirports = asyncHandler(async (req, res) => {
  const airports = await Airport.find({});
  res.json(airports);
});

// @desc    Get airport by ID
// @route   GET /api/airports/:id
// @access  Public
const getAirportById = asyncHandler(async (req, res) => {
  const airport = await Airport.findById(req.params.id);

  if (airport) {
    res.json(airport);
  } else {
    res.status(404);
    throw new Error("Airport not found");
  }
});

// @desc    Delete airport
// @route   DELETE /api/airports/:id
// @access  Admin
const deleteAirport = asyncHandler(async (req, res) => {
  const airport = await Airport.findById(req.params.id);

  if (airport) {
    await airport.remove();
    res.json({ message: "Airport removed" });
  } else {
    res.status(404);
    throw new Error("Airport not found");
  }
});

// @desc    Update airport
// @route   PUT /api/airports/:id
// @access  Admin
const updateAirport = asyncHandler(async (req, res) => {
  const airport = await Airport.findById(req.params.id);

  if (airport) {
    airport.name = req.body.name || airport.name;
    airport.description = req.body.description || airport.description;
    airport.country = req.body.country || airport.country;
    airport.isPopular = req.body.isPopular || airport.isPopular;

    const updatedAirport = await airport.save();

    res.json({
      _id: updatedAirport._id,
      name: updatedAirport.name,
      description: updatedAirport.description,
      country: updatedAirport.country,
      isPopular: updatedAirport.isPopular,
    });
  } else {
    res.status(404);
    throw new Error("Airport not found");
  }
});

export {
  registerAirport,
  getAirports,
  getAirportById,
  deleteAirport,
  updateAirport,
};
