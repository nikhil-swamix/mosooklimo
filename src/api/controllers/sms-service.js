import AWS from 'aws-sdk'
import dotenv from "dotenv";
dotenv.config()
// var AWS = require('aws-sdk');
// Set region
AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: env.AWS_ACCESS_KEY, 
  secretAccessKey: env.AWS_SECRET_KEY,
});


var configtemplate={
  priority:["Transactional","Promotional"][0],
  targets:['+919959389649','+919871056158'],
  timestamp: new Date().toISOString(),
  message:'Dear Admin Chauffeuer [Md Qureshi] applied to Mosooklimo please verify'
}

// Create publish parameters
function publishSMS(config) {
  config.targets.forEach((target)=>{
    var params = {
      Message: `${config.timestamp} ${config.priority} ${config.message}`,
      PhoneNumber: target,
      MessageAttributes: {
          'AWS.SNS.SMS.SMSType': {
             DataType: 'String',
             StringValue: config.priority
          }
      }
    }
    // console.log(params)
    var publishTextPromise = new AWS.SNS().publish(params).promise(); // Create promise and SNS service object

    publishTextPromise.then( function(data) {
        console.log(params.Message);
        console.log(data);
    })
    .catch( function(err) {
        console.error(err, err.stack);
    });

  })
}

export default publishSMS