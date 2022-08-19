import dotenv from "dotenv";
import users from "./data/users.js";
import airports from "./data/airports.js";
import chauffeurs from "./data/chauffeurs.js";

import User from "./api/models/user.js";
import Airport from "./api/models/airport.js";
import Chauffeur from "./api/models/chauffeur.js";

import connectDB from "./database/connectDB.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // destroyData()

    const createdUsers = await User.insertMany(users);
    const createdAirports = await Airport.insertMany(airports);
    const createdChaufferus = await Chauffeur.insertMany(chauffeurs);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Airport.deleteMany();
    await User.deleteMany();
    await Chauffeur.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`.red);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
