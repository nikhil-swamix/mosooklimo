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
    paymentDetail: {
      type: String,
      default: 'Bank Name | IBAN | SWIFT',
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
    isVerified: {
      type: Boolean,
      require: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    registrationNo: {
      type: String,
      required: true,
    },
    // DOCUMENTS
    userDocument:{
      type: String,
      required: true,
    },
    userImage:{
      type: String,
      default: './images/driver.png',
      required: true,
    },
    carImage: {
      type: String,
      default:"./images/cardefault.png",
      required: true,
    },

    // CAR DETAILS
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

    // LOCATION DETAILS
    activeCountry: {
      type: String,
      default: "none",
      // required: true,
    },
    activeState: {
      type: String,
      default: "state",
      // required: true,
    },
    activeCity: {
      type: String,
      default: "none",
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

    // ADDON SERVICES
    babySeat: {
      type: Number,
      default: 1,
    },
    boosterSeat: {
      type: Number,
      default: 1,
    },
    specialLuggage: {
      type: Number,
      default: 1,
    },
    pets: {
      type: Number,
      default: 1,
    },
    extraStop: {
      type: Number,
      default: 1,
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

// console.log(Object.keys(Chauffeur),Chauffeur.schema.obj)
export default Chauffeur;
