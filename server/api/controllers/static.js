import asyncHandler from "express-async-handler";
import Static from "../models/static.js";

// @desc    Register a new Static
// @route   POST /api/airports
// @access  Admin
const registerFirst = asyncHandler(async (req, res) => {
  const data = await Static.create({});

  if (data) {
    res.status(201).json({
      _id: data._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

// @desc    Get all airports
// @route   GET /api/airports
// @access  Public
const getStaticData = asyncHandler(async (req, res) => {
  const data = await Static.find({});
  if (data.length==0){
    console.log('registering static')
    const data = await Static.create({});
      if (data) {
        res.status(201).json({
          _id: data._id,
        });
      } else {
        res.status(400);
        throw new Error("Invalid data");
      }
  }

  res.json(data);
});

// @desc    Update airport
// @route   PUT /api/data/
// @access  Admin
const updateStaticData = asyncHandler(async (req, res) => {
  const data = await Static.findById(req.params.id);
  var attrs=['disclosureTitle', 'disclosureDescription', 'privacyTitle', 'privacyDescription', 'termsTitle', 'termsDescriptionTraveller', 'termsDescriptionTransportation', 'aboutTitle', 'aboutSub1', 'aboutSub2',] 

  if (data) {
    for (var i of attrs) {
      data[i] = req.body[i] || data[i];
    }
    const updatedData = await data.save();
    res.json(updatedData);
    
  } else {
    res.status(404);
    throw new Error("Static Data not found");
  }
});

export { registerFirst, getStaticData, updateStaticData };
