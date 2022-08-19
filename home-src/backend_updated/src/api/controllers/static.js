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
  res.json(data);
});

// @desc    Update airport
// @route   PUT /api/airports/:id
// @access  Admin
const updateStaticData = asyncHandler(async (req, res) => {
  const data = await Static.findById(req.params.id);

  if (data) {
    data.disclosureTitle = req.body.disclosureTitle || data.disclosureTitle;
    data.disclosureDescription =
      req.body.disclosureDescription || data.disclosureDescription;

    data.privacyTitle = req.body.privacyTitle || data.privacyTitle;
    data.privacyDescription =
      req.body.privacyDescription || data.privacyDescription;

    data.termsTitle = req.body.termsTitle || data.termsTitle;
    data.termsDescriptionTraveller =
      req.body.termsDescriptionTraveller || data.termsDescriptionTraveller;

    data.termsDescriptionTransportation =
      req.body.termsDescriptionTransportation ||
      data.termsDescriptionTransportation;

    data.aboutTitle = req.body.aboutTitle || data.aboutTitle;
    data.aboutSub1 = req.body.aboutSub1 || data.aboutSub1;
    data.aboutSub2 = req.body.aboutSub2 || data.aboutSub2;

    const updatedData = await data.save();

    res.json({
      _id: updatedData._id,
      disclosureTitle: updatedData.disclosureTitle,
      disclosureDescription: updatedData.disclosureDescription,

      privacyTitle: updatedData.privacyTitle,
      privacyDescription: updatedData.privacyDescription,

      termsTitle: updatedData.termsTitle,
      termsDescriptionTraveller: updatedData.termsDescriptionTraveller,
      termsDescriptionTransportation:
        updatedData.termsDescriptionTransportation,

      aboutTitle: updateStaticData.aboutTitle,
      aboutSub1: updateStaticData.aboutSub1,
      aboutSub2: updateStaticData.aboutSub2,
    });
  } else {
    res.status(404);
    throw new Error("Static Data not found");
  }
});

export { registerFirst, getStaticData, updateStaticData };
