import fetch from 'node-fetch';

// const fetch = require('node-fetch');


function publishEmailVerified(params) {
  const url = 'https://api.sendinblue.com/v3/smtp/email';
  const options = { 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': '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'
    },
    body: JSON.stringify({
      sender: {name: 'Mosooklimo', email: 'nikhilswami1@gmail.com',},
      to: [{email: params.USER.email, name: 'Mosook Admin'}],//meenakshi
      
      // bcc: [{email: 'helen9766@example.com', name: 'Helen'}],
      // cc: [{email: 'pkj.j09@gmail.com', name: 'Pankaj Jain'}],
      

      subject: `Dear ${params.USER.name}, You have been verified!'`,
      htmlContent:`
      <!DOCTYPE html> 
      <html> 
      <body> 
        Dear Chauffeur, on ${new Date().toLocaleString('eu')}, we are happy to inform that.
        <h1 style="color:green">You have been verified successfully</h1>
        login with your credential at https://mosooklimo.com/driver
      </body> 
      </html>`,

      textContent: 'you have been verified, and can login to mosooklimo.com',
      replyTo: {email: 'admin@mosooklimo.com', name: 'Mosook Admin'},
      // attachment: [
      //   {
      //     url: 'https://attachment.domain.com/myAttachmentFromUrl.jpg',
      //     content: 'b3JkZXIucGRm',
      //     name: 'myAttachment.png'
      //   }
      // ],
      // templateId: 1,
      params: params,

      // scheduledAt: '2022-04-05T12:30:00+02:00',
      // batchId: '5c6cfa04-eed9-42c2-8b5c-6d470d978e9d'
    })
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

// publishEmailVerified(testparams)

export default publishEmailVerified

