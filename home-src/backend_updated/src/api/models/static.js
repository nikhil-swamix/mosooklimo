import mongoose from "mongoose";

const staticSchema = mongoose.Schema(
  {
    disclosureTitle: {
      type: String,
      default: "disclosureTitle",
    },
    disclosureDescription: {
      type: String,
      default: "disclosureDescription",
    },

    privacyTitle: {
      type: String,
      default: "privacyTitle",
    },
    privacyDescription: {
      type: String,
      default: "privacyDescription",
    },

    termsTitle: {
      type: String,
      default: "termsTitle",
    },
    termsDescriptionTraveller: {
      type: String,
      default: "termsDescriptionTraveller",
    },
    termsDescriptionTransportation: {
      type: String,
      default: "termsDescriptionTransportation",
    },

    aboutTitle: {
      type: String,
      default: "aboutTitle",
    },
    aboutSub1: {
      type: String,
      default: "aboutSub1",
    },
    aboutSub2: {
      type: String,
      default: "aboutSub2",
    },
  },
  {
    timestamps: true,
  }
);

const Static = mongoose.model("Static", staticSchema);

export default Static;
