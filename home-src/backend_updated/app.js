import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import path from "path";

import axios from "axios";

import connectDB from "./src/database/connectDB.js";

import user from "./src/api/routes/user.js";
import order from "./src/api/routes/order.js";
import orderLux from "./src/api/routes/orderLux.js";
import chauffeur from "./src/api/routes/chauffeur.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
import airport from "./src/api/routes/airport.js";
import staticData from "./src/api/routes/static.js";
import blog from "./src/api/routes/blog.js";
import upload from "./src/api/routes/upload.js";

import { notFound, errorHandler } from "./src/util/error.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/directions/:p1/:p2", (req, res) => {
  const { p1, p2 } = req.params;
  // console.log("HI", req.params);
  axios
    .get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${p1}&origins=${p2}&key=${process.env.GMAP_KEY}`,
      {
        "Access-Control-Allow-Origin": "*",
      }
    )
    .then(function (response) {
      // console.log(response);
      res.json({
        duration: response.data.rows[0].elements[0].duration.text,
        distance: response.data.rows[0].elements[0].distance.text.split(" ")[0],
      });
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

app.use("/api/users", user);
app.use("/api/chauffeurs", chauffeur);
app.use("/api/orders", order);
app.use("/api/rental", orderLux);
// app.use("/api/upload", uploadRoutes);
app.use("/api/airports", airport);
app.use("/api/data", staticData);
app.use("/api/blogs", blog);

//Payment Paypal
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//Upload Image
app.use("/api/upload", upload);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Custom Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
