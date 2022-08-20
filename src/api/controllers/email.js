import fetch from 'node-fetch';

// const fetch = require('node-fetch');

const url = 'https://api.sendinblue.com/v3/smtp/email';
const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'api-key': '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'
  },
  body: JSON.stringify({
    sender: {name: 'Mosook Admin', email: 'nikhilswami1@gmail.com', id: 2},
    to: [{email: 'hiyabuza.nikhil@gmail.com', name: 'Jimmy'}],
    // bcc: [{email: 'helen9766@example.com', name: 'Helen'}],
    // cc: [{email: 'ann6533@example.com', name: 'Ann'}],
    htmlContent: '<!DOCTYPE html> <html> <body> <h1>Confirm you email</h1> <p>Please confirm your email address by clicking on the link below</p> </body> </html>',
    textContent: 'Please confirm your email address by clicking on the link https://text.domain.com',
    subject: 'Login Email confirmation',
    replyTo: {email: 'hiyabuza.nikhil@gmail.com.com', name: 'Mosook Admin'},
    // attachment: [
    //   {
    //     url: 'https://attachment.domain.com/myAttachmentFromUrl.jpg',
    //     content: 'b3JkZXIucGRm',
    //     name: 'myAttachment.png'
    //   }
    // ],
    // headers: {
    //   'sender.ip': '1.2.3.4',
    //   'X-Mailin-custom': 'some_custom_header',
    //   idempotencyKey: 'abc-123'
    // },
    templateId: 2,
    params: {FNAME: 'Test', LNAME: 'Doe'},
    messageVersions: [
      {
        to: [{email: 'jimmy98@example.com', name: 'Jimmy'}],
        params: {FNAME: 'Joe', LNAME: 'Doe'},
        bcc: [{email: 'helen9766@example.com', name: 'Helen'}],
        cc: [{email: 'ann6533@example.com', name: 'Ann'}],
        replyTo: {email: 'ann6533@example.com', name: 'Ann'},
        subject: 'ALERT: A New Chauffeur has been registered!'
      }
    ],
    // tags: ['tag1'],
    // scheduledAt: '2022-04-05T12:30:00+02:00',
    batchId: '5c6cfa04-eed9-42c2-8b5c-6d470d978e9d'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));


// import SibApiV3Sdk from 'sib-api-v3-sdk'
// // var SibApiV3Sdk = require('sib-api-v3-sdk');
// var defaultClient = SibApiV3Sdk.ApiClient.instance;

// // Instantiate the client\
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = 'YOUR_API_V3_KEY';
// var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
// var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
// // Define the campaign settings\

// emailCampaigns.name = "Campaign sent via the API";
// emailCampaigns.subject = "ALERT: New Driver Has Been Registered";
// emailCampaigns.sender = {"name": "Mosook Admin", "email":"nikhilswami1@gmail.com"};
// emailCampaigns.type = "classic";

// htmlContent='Congratulations! You successfully sent this example campaign via the Sendinblue API.',
// // Select the recipients\
// recipients= {listIds: [2, 7]}
// // Make the call to the client\
// apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
// console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
// console.error(error);
// });

