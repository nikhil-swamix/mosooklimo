import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const chauffeurSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    agencyName: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      require: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: "inactive",
    },

    registrationNo: {
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
    year: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    luggageCapacity: {
      type: Number,
      required: true,
    },
    activeCountry: {
      type: String,
      required: true,
    },
    activeState: {
      type: String,
      required: true,
    },
    activeCity: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    priceperday: {
      type: Number,
      required: true,
      default: 100,
    },
    priceperkm: {
      type: Number,
      required: true,
      default: 5,
    },
    babySeat: {
      type: Number,
      default: 10,
    },
    boosterSeat: {
      type: Number,
      default: 10,
    },
    specialLuggage: {
      type: Number,
      default: 10,
    },
    pets: {
      type: Number,
      default: 10,
    },
    extraStop: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

chauffeurSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Before save , this middleware run the function and hashed the password
chauffeurSchema.pre("save", async function (next) {
  // Checking if there is password field or not, for updating name or email, we don't want this function to run
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Chauffeur = mongoose.model("Chauffeur", chauffeurSchema);

export default Chauffeur;
