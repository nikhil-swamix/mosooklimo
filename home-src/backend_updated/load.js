import dotenv from "dotenv";
import users from "./src/data/users.js";
import airports from "./src/data/airports.js";
import chauffeurs from "./src/data/chauffeurs.js";

import User from "./src/api/models/user.js";
import Airport from "./src/api/models/airport.js";
import Chauffeur from "./src/api/models/chauffeur.js";

import connectDB from "./src/database/connectDB.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Airport.deleteMany();
    await User.deleteMany();
    await Chauffeur.deleteMany();

    const createdAirports = await Airport.insertMany(airports);
    const createdUsers = await User.insertMany(users);
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
