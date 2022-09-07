import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    pickupAddress: {
      type: String,
      required: true,
    },
    destinationAddress: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      require: true,
    },
    bookingTime: {
      type: String,
      require: true,
    },
    noOfPassenger: {
      type: Number,
      require: true,
    },
    noOfLuggage: {
      type: Number,
      require: true,
    },
    isRoundTrip: {
      type: Boolean,
      require: true,
      default: false,
    },
    rBookingDate: {
      type: Date,
    },
    rBookingTime: {
      type: String,
    },
    distance: {
      type: Number,
      require: true,
    },
    vehicleClass: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    meetGreet: {
      type: Boolean,
      require: true,
      default: false,
    },
    noOfBabySeat: {
      type: Number,
      require: true,
      default: 0,
    },
    noOfBoosterSeat: {
      type: Number,
      require: true,
      default: 0,
    },
    noOfSpecialLuggage: {
      type: Number,
      require: true,
      default: 0,
    },
    noOfPets: {
      type: Number,
      require: true,
      default: 0,
    },
    noOfExtraStop: {
      type: Number,
      require: true,
      default: 0,
    },

    isBookingForSomeone: {
      type: Boolean,
      require: true,
      default: false,
    },
    passengerName: {
      type: String,
    },
    passengerPhone: {
      type: String,
    },
    passengerEmail: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    flightNo: {
      type: String,
    },
    countryOfResidence: {
      type: String,
      require: true,
    },
    remarks: {
      type: String,
    },

    paymentMethod: {
      type: String,
      require: true,
      default: "online",
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chauffeur",
    },
    isCancelled: {
      type: Boolean,
      required: true,
      default: false,
    },
    cancelledAt: {
      type: Date,
    },
    isRefunded: {
      type: Boolean,
      required: true,
      default: false,
    },
    refundAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
