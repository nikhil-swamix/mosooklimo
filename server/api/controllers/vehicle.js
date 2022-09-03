import asyncHandler from "express-async-handler";
import Vehicle from "../models/vehicle.js";

// @desc    Register a new Vehicle
// @route   POST /api/airports
// @access  Admin
const registerVehicle = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    type,
    model,
    color,
    country,
    state,
    city,
    priceperday,
    priceperkm,

    passenger,
    luggage,
    babySeat,
    boosterSeat,
    specialLuggage,
    pets,
    extraStop,
  } = req.body;

  const vehicle = await Vehicle.create({
    name,
    brand,
    type,
    model,
    color,
    country,
    state,
    city,
    priceperday,
    priceperkm,

    passenger,
    luggage,
    babySeat,
    boosterSeat,
    specialLuggage,
    pets,
    extraStop,
  });

  if (vehicle) {
    res.status(201).json(vehicle);
  } else {
    res.status(400);
    throw new Error("Invalid vehicle data");
  }
});

// @desc    Get all airports
// @route   GET /api/airports
// @access  Public
const getVehicles = asyncHandler(async (req, res) => {
  const airports = await Vehicle.find({});
  res.json(airports);
});

// @desc    Get airport by ID
// @route   GET /api/airports/:id
// @access  Public
const getVehicleById = asyncHandler(async (req, res) => {
  const airport = await Vehicle.findById(req.params.id);

  if (airport) {
    res.json(airport);
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

// @desc    Get Vehicle by Country
// @route   GET /api/airports/:id
// @access  Public
const getVehicleByCountry = asyncHandler(async (req, res) => {
  const airport = await Vehicle.find({ country: req.params.country });

  if (airport) {
    res.json(airport);
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

// @desc    Get airport by ID
// @route   GET /api/airports/:id
// @access  Public
const getVehicleByState = asyncHandler(async (req, res) => {
  const airport = await Vehicle.find({ state: req.params.state });

  if (airport) {
    res.json(airport);
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

// @desc    Get airport by ID
// @route   GET /api/airports/:id
// @access  Public
const getVehicleByCity = asyncHandler(async (req, res) => {
  const airport = await Vehicle.find({ city: req.params.city });

  if (airport) {
    res.json(airport);
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

// @desc    Delete airport
// @route   DELETE /api/airports/:id
// @access  Admin
const deleteVehicle = asyncHandler(async (req, res) => {
  const airport = await Vehicle.findById(req.params.id);

  if (airport) {
    await airport.remove();
    res.json({ message: "Vehicle removed" });
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

// @desc    Update airport
// @route   PUT /api/airports/:id
// @access  Admin
const updateVehicle = asyncHandler(async (req, res) => {
  const airport = await Vehicle.findById(req.params.id);

  if (airport) {
    airport.name = req.body.name || airport.name;
    airport.brand = req.body.brand || airport.brand;
    airport.type = req.body.type || airport.type;
    airport.model = req.body.model || airport.model;
    airport.color = req.body.color || airport.color;
    airport.country = req.body.country || airport.country;
    airport.state = req.body.state || airport.state;
    airport.city = req.body.city || airport.city;
    airport.priceperday = req.body.priceperday || airport.priceperday;
    airport.priceperkm = req.body.priceperkm || airport.priceperkm;

    airport.passenger = req.body.passenger || airport.passenger;
    airport.luggage = req.body.luggage || airport.luggage;
    airport.babySeat = req.body.babySeat || airport.babySeat;
    airport.boosterSeat = req.body.boosterSeat || airport.boosterSeat;
    airport.specialLuggage = req.body.specialLuggage || airport.specialLuggage;
    airport.pets = req.body.pets || airport.pets;
    airport.extraStop = req.body.extraStop || airport.extraStop;

    const updatedVehicle = await airport.save();

    res.json(updatedVehicle);
  } else {
    res.status(404);
    throw new Error("Vehicle not found");
  }
});

export {
  registerVehicle,
  getVehicles,
  getVehicleById,
  deleteVehicle,
  updateVehicle,
  getVehicleByCountry,
  getVehicleByState,
  getVehicleByCity,
};
