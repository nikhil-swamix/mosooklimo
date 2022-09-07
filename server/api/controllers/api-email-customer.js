import fetch from 'node-fetch';
import hbs from 'express-handlebars';

var hbse = hbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
})

async function publishEmailCustomer(params) {
  const url = 'https://api.sendinblue.com/v3/smtp/email';
  const options = { 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': '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'
    },
    body: JSON.stringify({
      sender: {name: 'MosookLimo Admin', email: 'nikhilswami1@gmail.com',},
      to: [{email: params.ORDER.email, name: params.ORDER.name}],
      subject: `Moosooklimo Order Confirmation of ${params.CHAUFFEUR.brand} ${params.CHAUFFEUR.model} on ${params.ORDER.bookingDate} !'`,
      htmlContent:await hbse.render("./server/api/controllers/customer_mail_template_inline.html", params).then((renderedHtml) => {
        // console.log(renderedHtml)
        return renderedHtml
      }),

      textContent: 'to verify the registered partner visit the dashboard and navigate to Chauffuer section using this link ',
      replyTo: {email: 'admin@mosooklimo.com', name: 'Mosook Admin'},
      params: params,

      // scheduledAt: '2022-04-05T12:30:00+02:00',
    })
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

var testParams={
  ORDER:undefined,
}




// publishEmailCustomer({})

export default publishEmailCustomer

