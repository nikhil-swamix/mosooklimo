import bcrypt from "bcryptjs";

const chauffeur = [
  {
    name: "Sonit Kumar Adhikari",
    email: "adhikari@email.com",
    phone: "+91-7002060328",
    password: bcrypt.hashSync("1234", 10),
    classOfVehicle: "sedan",
    registrationNo: "AS12-Y3650",
    seatingCapacity: 4,
    luggageCapacity: 2,
    country: "india",
    state: "assam",
    fuelType: "petrol",
    isVerified: true,
    status: true,
  },
  {
    name: "Sonit Kumar Adhikari 2",
    email: "adhikari2@email.com",
    phone: "+91-7002060328",
    password: bcrypt.hashSync("1234", 10),
    classOfVehicle: "premium sedan",
    registrationNo: "AS01-Y3000",
    seatingCapacity: 2,
    luggageCapacity: 4,
    country: "india",
    state: "assam",
    fuelType: "petrol",
    isVerified: true,
    status: true,
  },
];

export default chauffeur;
