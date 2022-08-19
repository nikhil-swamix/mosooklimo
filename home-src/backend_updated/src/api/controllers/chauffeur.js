import asyncHandler from "express-async-handler";
import token from "../../util/token.js";
import Chauffeur from "../models/chauffeur.js";

// @desc    Auth chauffeur & get token
// @route   POST /api/chauffeurs/login
// @access  Public
const authChauffeur = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Chauffeur.findOne({ email });
  if (user && user.isVerified && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: token.generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a chauffeurs
// @route   POST /api/chauffeurs
// @access  Public
const registerChauffeur = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    agencyName,
    country,
    state,
    registrationNo,
    brand,
    type,
    model,
    year,
    color,
    seatingCapacity,
    luggageCapacity,
    activeCountry,
    activeState,
    activeCity,
    fuelType,
  } = req.body;
  const userExists = await Chauffeur.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Chauffeur already exists");
  }
  // console.log(phone);
  const user = await Chauffeur.create({
    name,
    email,
    phone,
    password,
    agencyName,
    country,
    state,
    registrationNo,
    brand,
    type,
    model,
    year,
    color,
    seatingCapacity,
    luggageCapacity,
    activeCountry,
    activeState,
    activeCity,
    fuelType,
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get chauffeurs profile
// @route   GET /api/chauffeurs/profile
// @access  Private
const getChauffeurProfile = asyncHandler(async (req, res) => {
  const user = await Chauffeur.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      agencyName: user.agencyName,
      country: user.country,
      state: user.state,
      isVerified: user.isVerified,
      status: user.status,
      registrationNo: user.registrationNo,

      brand: user.brand,
      type: user.type,
      model: user.model,

      year: user.year,
      color: user.color,
      seatingCapacity: user.seatingCapacity,
      luggageCapacity: user.luggageCapacity,

      activeCountry: user.activeCountry,
      activeState: user.activeState,
      activeCity: user.activeCity,

      fuelType: user.fuelType,

      priceperday: user.priceperday,
      priceperkm: user.priceperkm,

      babySeat: user.babySeat,
      boosterSeat: user.boosterSeat,
      specialLuggage: user.specialLuggage,

      pets: user.pets,

      extraStop: user.extraStop,

      token: token.generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Chauffeur not found");
  }
});

// @desc    Update chauffeurs profile
// @route   PUT /api/chauffeurs/profile
// @access  Private
const updateChauffeurProfile = asyncHandler(async (req, res) => {
  const { email, phone, password, activeCountry, activeState, activeCity } =
    req.body;

  const user = await Chauffeur.findById(req.user._id);

  if (user) {
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.activeCountry = activeCountry || user.activeCountry;
    user.activeState = activeState || user.activeState;
    user.activeCity = activeCity || user.activeCity;
    if (password) {
      user.password = password;
    }

    const updatedChauffeur = await user.save();

    res.json({
      _id: updatedChauffeur._id,
      name: updatedChauffeur.name,
      phone: updatedChauffeur.phone,
      email: updatedChauffeur.email,
      agencyName: updatedChauffeur.agencyName,
      country: updatedChauffeur.country,
      state: updatedChauffeur.state,
      isVerified: updatedChauffeur.isVerified,
      status: updatedChauffeur.status,
      registrationNo: updatedChauffeur.registrationNo,

      brand: updatedChauffeur.brand,
      type: updatedChauffeur.type,
      model: updatedChauffeur.model,

      year: updatedChauffeur.year,
      color: updatedChauffeur.color,
      seatingCapacity: updatedChauffeur.seatingCapacity,
      luggageCapacity: updatedChauffeur.luggageCapacity,

      activeCountry: updatedChauffeur.activeCountry,
      activeState: updatedChauffeur.activeState,
      activeCity: updatedChauffeur.activeCity,

      fuelType: updatedChauffeur.fuelType,

      priceperday: updatedChauffeur.priceperday,
      priceperkm: updatedChauffeur.priceperkm,

      babySeat: updatedChauffeur.babySeat,
      boosterSeat: updatedChauffeur.boosterSeat,
      specialLuggage: updatedChauffeur.specialLuggage,

      pets: updatedChauffeur.pets,

      extraStop: updatedChauffeur.extraStop,
      token: token.generateToken(updatedChauffeur._id),
    });
  } else {
    res.status(404);
    throw new Error("Chauffeur not found");
  }
});

// @desc    Get all chauffeurs
// @route   GET /api/chauffeurs
// @access  Admin
const getChauffeurs = asyncHandler(async (req, res) => {
  const users = await Chauffeur.find({});
  res.json(users);
});

// @desc    Delete chauffeur
// @route   DELETE /api/chauffeurs/:id
// @access  Admin
const deleteChauffeur = asyncHandler(async (req, res) => {
  const user = await Chauffeur.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "Chauffeur removed" });
  } else {
    res.status(404);
    throw new Error("Chauffeur not found");
  }
});

// @desc    Get chauffeur by ID
// @route   GET /api/chauffeurs/:id
// @access  Private/Admin
const getChauffeurById = asyncHandler(async (req, res) => {
  const user = await Chauffeur.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Chauffeur not found");
  }
});

// @desc    Update chauffeur
// @route   PUT /api/users/:id
// @access  Admin
const updateChauffeur = asyncHandler(async (req, res) => {
  const user = await Chauffeur.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.password = req.body.password || user.password;

    user.agencyName = req.body.agencyName || user.agencyName;
    user.country = req.body.country || user.country;
    user.state = req.body.state || user.state;
    user.isVerified = req.body.isVerified || user.isVerified;
    user.status = req.body.status || user.status;

    user.registrationNo = req.body.registrationNo || user.registrationNo;

    user.brand = req.body.brand || user.brand;
    user.type = req.body.type || user.type;
    user.model = req.body.model || user.model;
    user.year = req.body.year || user.year;
    user.color = req.body.color || user.color;
    user.seatingCapacity = req.body.seatingCapacity || user.seatingCapacity;
    user.luggageCapacity = req.body.luggageCapacity || user.luggageCapacity;

    user.priceperday = req.body.priceperday || user.priceperday;
    user.priceperkm = req.body.priceperkm || user.priceperkm;
    user.babySeat = req.body.babySeat || user.babySeat;
    user.boosterSeat = req.body.boosterSeat || user.boosterSeat;
    user.specialLuggage = req.body.specialLuggage || user.specialLuggage;
    user.pets = req.body.pets || user.pets;
    user.extraStop = req.body.extraStop || user.extraStop;
    user.fuelType = req.body.fuelType || user.fuelType;

    // user.isAdmin = req.body.isAdmin;

    const updatedChauffeur = await user.save();

    res.json({
      _id: updatedChauffeur._id,
      name: updatedChauffeur.name,
      phone: updatedChauffeur.phone,
      email: updatedChauffeur.email,
      agencyName: updatedChauffeur.agencyName,
      country: updatedChauffeur.country,
      state: updatedChauffeur.state,
      isVerified: updatedChauffeur.isVerified,
      status: updatedChauffeur.status,
      registrationNo: updatedChauffeur.registrationNo,

      brand: updatedChauffeur.brand,
      type: updatedChauffeur.type,
      model: updatedChauffeur.model,

      year: updatedChauffeur.year,
      color: updatedChauffeur.color,
      seatingCapacity: updatedChauffeur.seatingCapacity,
      luggageCapacity: updatedChauffeur.luggageCapacity,

      activeCountry: updatedChauffeur.activeCountry,
      activeState: updatedChauffeur.activeState,
      activeCity: updatedChauffeur.activeCity,

      fuelType: updatedChauffeur.fuelType,

      priceperday: updatedChauffeur.priceperday,
      priceperkm: updatedChauffeur.priceperkm,

      babySeat: updatedChauffeur.babySeat,
      boosterSeat: updatedChauffeur.boosterSeat,
      specialLuggage: updatedChauffeur.specialLuggage,

      pets: updatedChauffeur.pets,

      extraStop: updatedChauffeur.extraStop,
    });
  } else {
    res.status(404);
    throw new Error("Chauffeur not found");
  }
});

const getCarBrand = asyncHandler(async (req, res) => {
  const user = await Chauffeur.collection.distinct("brand");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

const getCarByBrand = asyncHandler(async (req, res) => {
  const user = await Chauffeur.find({
    brand: req.params.brand,
  }).select("brand type model year color priceperday");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

const getCarByFilter = asyncHandler(async (req, res) => {
  // console.log(req.query);
  const user = await Chauffeur.find({
    brand: req.query.brand,
    type: req.query.type,
    model: req.query.model,
    color: req.query.color,
    activeCity: req.query.city,
  }).select(
    "brand type model color priceperday priceperkm seatingCapacity luggageCapacity babySeat specialLuggage boosterSeat pets extraStop"
  );

  if (user) {
    res.json([user[0]]);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

const getActiveCity = asyncHandler(async (req, res) => {
  const user = await Chauffeur.collection.distinct("activeCity");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

export {
  authChauffeur,
  registerChauffeur,
  getChauffeurProfile,
  updateChauffeurProfile,
  getChauffeurs,
  deleteChauffeur,
  getChauffeurById,
  updateChauffeur,
  getCarBrand,
  getCarByBrand,
  getCarByFilter,
  getActiveCity,
};
