import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    passenger: {
      type: Number,
      required: true,
    },
    luggage: {
      type: Number,
      required: true,
    },
    priceperday: {
      type: Number,
      required: true,
    },
    priceperkm: {
      type: Number,
      required: true,
    },
    babySeat: {
      type: Number,
    },
    boosterSeat: {
      type: Number,
    },
    specialLuggage: {
      type: Number,
    },
    pets: {
      type: Number,
    },
    extraStop: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
