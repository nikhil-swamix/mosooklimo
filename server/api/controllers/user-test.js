import User from "../models/user.js";
import token from "../../util/token.js";
import asyncHandler from "express-async-handler";

import "../../database/connectDB.js";



const users = async () => console.log(await User.findOne()) ;

users()

var a=3