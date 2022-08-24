import asyncHandler from "express-async-handler";
import token from "../../util/token.js";
import Chauffeur from "../models/chauffeur.js";
import publishEmail from "./email.js";
import publishEmailVerified from "./email-verified.js";

console.log(publishEmail)
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
  const userExists = await Chauffeur.findOne(req.body );
  if (userExists) {
    res.status(400);
    throw new Error("Chauffeur already exists");
  }
  
  const user = await Chauffeur.create(req.body );

  if (user) {
    publishEmail({
      FULLNAME: user.name,
      EMAIL:user.email,
      PHONE:user.phone,
    })
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
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Chauffeur not found");
  }
});

// @desc    Update chauffeurs profile
// @route   PUT /api/chauffeurs/profile
// @access  Private
const updateChauffeurProfile = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;
  const user = await Chauffeur.findById(req.user._id);

  if (user) {
    user.email = email || user.email;
    user.phone = phone || user.phone;
    if (password) {
      user.password = password;
    }

    const updatedChauffeur = await user.save();

    res.json(updatedChauffeur);
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
// @route   PUT /api/chauffeurs/:id
// @access  Admin
const updateChauffeur = asyncHandler(async (req, res) => {
  const user = await Chauffeur.findById(req.params.id);
  // console.log(Object.keys(Chauffeur.schema.obj))
  var attrs=Object.keys(Chauffeur.schema.obj)
  if (user) {
    for (var i of attrs) {
      user[i] = req.body[i] || user[i];
    }
    const updatedChauffeur = await user.save();
    if (updatedChauffeur.isVerified){

    }
    res.json(updatedChauffeur);
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
  console.log(req.query);
  
  const car = await Chauffeur.find({
    brand: {$regex: new RegExp(req.query.brand, "ig")} ,
    activeCity: {$regex: new RegExp(req.query.activeCity, "ig")},
  });

  if (car) {
    res.json(car);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

const getCarByFilterCity = asyncHandler(async (req, res) => {
  // console.log(req.query);
  const user = await Chauffeur.find({
    activeCity: {$regex: new RegExp(req.query.city, "ig")},
  })

  if (user) {
    res.json([user]);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

const getActiveCitiesOfChauffeurs = asyncHandler(async (req, res) => {
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
  getCarByFilterCity,
  getActiveCitiesOfChauffeurs
};
