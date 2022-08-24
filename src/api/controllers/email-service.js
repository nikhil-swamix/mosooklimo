import fetch from 'node-fetch';

// const fetch = require('node-fetch');


function publishEmail(params) {
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
      to: [{email: 'meenakshiydv1999@gmail.com', name: 'Mosook Admin'}],
      
      // bcc: [{email: 'helen9766@example.com', name: 'Helen'}],
      cc: [{email: 'pkj.j09@gmail.com', name: 'Pankaj Jain'}],
      

      subject: `New Registration of ${params.FULLNAME}, please verify!'`,
      htmlContent:`
      <!DOCTYPE html> 
      <html> 
      <body> 
        Dear Admin,
        <h1>Need To Verify New Chauffuer</h1>
        <p>the Details of Chauffeur are </p>
        <table>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
          <tr>
            <td>${params.FULLNAME}</td>
            <td>${params.EMAIL}</td>
            <td>${params.PHONE}</td>
          </tr>
        </table>
        <p>Review their application using this URL and navigate to Chauffeur Panel</p>
        https://mosooklimo.com/admin
      </body> 
      </html>`,

      textContent: 'to verify the registered partner visit the dashboard and navigate to Chauffuer section using this link ',
      replyTo: {email: 'admin@mosooklimo.com', name: 'Mosook Admin'},
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

// publishEmail(testparams)

export default publishEmail

