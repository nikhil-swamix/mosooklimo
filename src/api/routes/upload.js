// import aws from "aws-sdk";
import crypto from "crypto";
import express from "express";
import fs from "fs";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import {S3Client} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config()

const router = express.Router();
const __dirname = path.resolve(path.dirname(''))

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {// By default, multer removes file extensions so let's add them back
    cb(null, `${file.fieldname}-${req.body.email}.${file.originalname.split('.').pop()}`);
  }
});


const hyperFileFilter = function(req, file, cb) { // Accept images only
  // console.log('pre log',Object.keys(req))
  // crypto.createHash('sha1').update(file.buffer).digest('base64');
  // let allowedset1=/\.pdf|html$/

  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|pdf|html)$/)) {
    var allowedTypes='jpg|jpeg|png|gif|webp|pdf|html'
    req.fileValidationError = 'only '+allowedTypes+' are allowed';
    return cb(new Error(req.fileValidationError), false);
  }
  cb(null, true);
};

const s3 = new S3Client({
  credentials:{
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
  },
  configuration:{
  },
  region:'ap-south-1',
})



const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mosooklimo',
    // acl:'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, `${file.fieldname}-${req.body.email}.${file.originalname.split('.').pop()}`);
    },
  })
}).any()

// const upload = multer({ storage: storage, fileFilter: hyperFileFilter }).any();


router.post("/",upload,function (req, res, next) {
  /*DEBUG=Object.keys(res.req.files)*/
  let response=req?.file?.path || req?.files[0].path
  console.log(res.req.files,)
  res.json(res.req.files[0].location)

  // res.json(response.replace('\\','/'));
  // res.send('sexxess')
})

export default router;
