// import uploadRoutes from "./routes/uploadRoutes.js";
import airport from "./src/api/routes/airport.js";
import axios from "axios";
import blog from "./src/api/routes/blog.js";
import chauffeur from "./src/api/routes/chauffeur.js";
import connectDB from "./src/database/connectDB.js";
import cors from "cors";
import dotenv from "dotenv";
import enquiry from "./src/api/routes/enquiry.js";
import express from "express";
import order from "./src/api/routes/order.js";
import orderLux from "./src/api/routes/orderLux.js";
import path from "path";
import staticData from "./src/api/routes/static.js";
import upload from "./src/api/routes/upload.js";
import user from "./src/api/routes/user.js";
import { notFound, errorHandler } from "./src/util/error.js";
import fileupload from 'express-fileupload' 
import bodyParser  from 'body-parser' 


dotenv.config();
connectDB();
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());  


app.get("/api/directions/:p1/:p2", (req, res) => {
  const { p1, p2 } = req.params;
  axios
    .get(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${p1}&origins=${p2}&key=${process.env.GMAP_KEY}`, {"Access-Control-Allow-Origin": "*",} )
    .then(function (response) {
      // console.log(response)
      res.json({
        duration: response.data.rows[0].elements[0].duration.text,
        distance: response.data.rows[0].elements[0].distance.text.split(" ")[0],
      });
    })
    .catch(function (error) {console.log(error); })
    .then(function () {
      // always executed
    });
});

app.use("/api/users", user);
app.use("/api/chauffeurs", chauffeur);
app.use("/api/orders", order);
app.use("/api/rental", orderLux);
app.use("/api/airports", airport);
app.use("/api/data", staticData);
app.use("/api/blogs", blog);
app.use("/api/enquiries", enquiry);
app.get("/api/config/paypal", (req, res) => {res.send(process.env.PAYPAL_CLIENT_ID); });

app.use("/api/upload", upload);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.get('/uploadtester',(req,res)=>{res.sendFile(__dirname +'/tests/uploadform.html')})

// -----PANELS
app.use('/admin', express.static('./admin')) // frontend admin static folder
app.use('/driver', express.static('./driver')) // frontend driver static folder
app.use('/utilities', express.static('./utilities')) // utilities


app.get('/101fd5534aad34d24acdd10fb99d2523.html', (req, res) => res.status(200).send(''));

var frontend_dir='home/' 
if (process.env.NODE_ENV=='dev') {
  console.log('THIS IS DEVELOPMENT SERVER')
  app.get('/api/info', (req, res) => res.send({dburl:process.env.MONGO_URI}));
  // frontend_dir='home-src/public/'
}

// -----REACT RESOLVER
app.use(express.static(path.join(__dirname,frontend_dir)));
app.get('*', (req, res) => res.sendFile(path.join(__dirname,frontend_dir+'index.html')));

// Custom Error handling
app.use(fileupload());
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
