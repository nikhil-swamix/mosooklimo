import mongoose from "mongoose";

const enquirySchema = mongoose.Schema(
  {
    category: {
      type: String,
      require: true,
    },
    msg: {
      type: String,
      require: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chauffeur",
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
