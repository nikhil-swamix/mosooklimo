import fetch from 'node-fetch';

function publishEmailCustomer(params) {
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
      to: [{email: params.ORDER.email, name: params.ORDER.email}],
      subject: `Moosooklimo Order Confirmation of ${params.CHAUFFEUR.brand} ${params.CHAUFFEUR.model} on ${params.ORDER.bookingDate} !'`,
      htmlContent:`
      <!DOCTYPE html> 
      <html>
      <body>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
      <style>
      .card {
        --bs-card-spacer-y: 1rem;
        --bs-card-spacer-x: 1rem;
        --bs-card-title-spacer-y: 0.5rem;
        --bs-card-border-width: 1px;
        --bs-card-border-color: var(--bs-border-color-translucent);
        --bs-card-border-radius: 0.375rem;
        --bs-card-box-shadow: ;
        --bs-card-inner-border-radius: calc(0.375rem - 1px);
        --bs-card-cap-padding-y: 0.5rem;
        --bs-card-cap-padding-x: 1rem;
        --bs-card-cap-bg: rgba(0, 0, 0, 0.03);
        --bs-card-cap-color: ;
        --bs-card-height: ;
        --bs-card-color: ;
        --bs-card-bg: #fff;
        --bs-card-img-overlay-padding: 1rem;
        --bs-card-group-margin: 0.75rem;
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        height: var(--bs-card-height);
        word-wrap: break-word;
        background-color: var(--bs-card-bg);
        background-clip: border-box;
        border: var(--bs-card-border-width) solid var(--bs-card-border-color);
        border-radius: var(--bs-card-border-radius);
      }
      .card > hr {
        margin-right: 0;
        margin-left: 0;
      }
      .card > .list-group {
        border-top: inherit;
        border-bottom: inherit;
      }
      .card > .list-group:first-child {
        border-top-width: 0;
        border-top-left-radius: var(--bs-card-inner-border-radius);
        border-top-right-radius: var(--bs-card-inner-border-radius);
      }
      .card > .list-group:last-child {
        border-bottom-width: 0;
        border-bottom-right-radius: var(--bs-card-inner-border-radius);
        border-bottom-left-radius: var(--bs-card-inner-border-radius);
      }
      .card > .card-header + .list-group,
      .card > .list-group + .card-footer {
        border-top: 0;
      }

      .card-body {
        flex: 1 1 auto;
        padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
        color: var(--bs-card-color);
      }

      .card-title {
        margin-bottom: var(--bs-card-title-spacer-y);
      }

      .card-subtitle {
        margin-top: calc(-0.5 * var(--bs-card-title-spacer-y));
        margin-bottom: 0;
      }

      .card-text:last-child {
        margin-bottom: 0;
      }

      .card-link + .card-link {
        margin-left: var(--bs-card-spacer-x);
      }

      .card-header {
        padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
        margin-bottom: 0;
        color: var(--bs-card-cap-color);
        background-color: var(--bs-card-cap-bg);
        border-bottom: var(--bs-card-border-width) solid var(--bs-card-border-color);
      }
      .card-header:first-child {
        border-radius: var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius) 0 0;
      }

      .card-footer {
        padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
        color: var(--bs-card-cap-color);
        background-color: var(--bs-card-cap-bg);
        border-top: var(--bs-card-border-width) solid var(--bs-card-border-color);
      }
      .card-footer:last-child {
        border-radius: 0 0 var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius);
      }

      .card-header-tabs {
        margin-right: calc(-0.5 * var(--bs-card-cap-padding-x));
        margin-bottom: calc(-1 * var(--bs-card-cap-padding-y));
        margin-left: calc(-0.5 * var(--bs-card-cap-padding-x));
        border-bottom: 0;
      }
      .card-header-tabs .nav-link.active {
        background-color: var(--bs-card-bg);
        border-bottom-color: var(--bs-card-bg);
      }

      .card-header-pills {
        margin-right: calc(-0.5 * var(--bs-card-cap-padding-x));
        margin-left: calc(-0.5 * var(--bs-card-cap-padding-x));
      }

      .card-img-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        padding: var(--bs-card-img-overlay-padding);
        border-radius: var(--bs-card-inner-border-radius);
      }

      .card-img,
      .card-img-top,
      .card-img-bottom {
        width: 100%;
      }

      .card-img,
      .card-img-top {
        border-top-left-radius: var(--bs-card-inner-border-radius);
        border-top-right-radius: var(--bs-card-inner-border-radius);
      }

      .card-img,
      .card-img-bottom {
        border-bottom-right-radius: var(--bs-card-inner-border-radius);
        border-bottom-left-radius: var(--bs-card-inner-border-radius);
      }

      .card-group > .card {
        margin-bottom: var(--bs-card-group-margin);
      }
      @media (min-width: 576px) {
        .card-group {
          display: flex;
          flex-flow: row wrap;
        }
        .card-group > .card {
          flex: 1 0 0%;
          margin-bottom: 0;
        }
        .card-group > .card + .card {
          margin-left: 0;
          border-left: 0;
        }
        .card-group > .card:not(:last-child) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .card-group > .card:not(:last-child) .card-img-top,
      .card-group > .card:not(:last-child) .card-header {
          border-top-right-radius: 0;
        }
        .card-group > .card:not(:last-child) .card-img-bottom,
      .card-group > .card:not(:last-child) .card-footer {
          border-bottom-right-radius: 0;
        }
        .card-group > .card:not(:first-child) {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        .card-group > .card:not(:first-child) .card-img-top,
      .card-group > .card:not(:first-child) .card-header {
          border-top-left-radius: 0;
        }
        .card-group > .card:not(:first-child) .card-img-bottom,
      .card-group > .card:not(:first-child) .card-footer {
          border-bottom-left-radius: 0;
        }
      }

      </style>
      <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "RentalCarReservation",
        "reservationNumber": "546323",
        "reservationStatus": "http://schema.org/Confirmed",
        "url": "https://mosooklimo.com/trackorder.php",
        "underName": {
          "@type": "Person",
          "name": "{{user.name}}",
          "email": "{{user.email}}"
        },
        "programMembership": {
          "@type": "ProgramMembership",
          "memberNumber": "{{user.phone}}",
          "program": "VIP"
        },
        "bookingAgent": {
          "@type": "Organization",
          "name": "Mosook Limo International",
          "url": "https://mosooklimo.com/"
        },
        "bookingTime": "2027-01-14T13:05:00-05:00",
        "modifiedTime": "",
        "cancelReservationUrl": "https://mosooklimo.com/customer-service.php",
        "modifyReservationUrl": "https://mosooklimo.com/customer-service.php",
        "potentialAction": [{
            "@type": "CancelAction",
            "target": "https://mosooklimo.com/customer-service.php"
          },
          {
            "@type": "EditAction",
            "target": "https://mosooklimo.com/customer-service.php"
          }
        ],
        "reservationFor": {
          "@type": "RentalCar",
          "name": "  ({{chauffeur.color}})",
          "model": "{{chauffeur.model}}",
          "brand": {
            "@type": "Brand",
            "name": "{{chauffeur.brand}}"
          },
          "description": "Sedan 4 Door, High Safety 5-Star Rating Luxurious VIP Car. ",
          "rentalCompany": {
            "@type": "Organization",
            "name": "MosookLimo"
          }
        },
        "pickupLocation": {
          "@type": "Place",
          "name": "${params.ORDER.pickupAddress}",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1500 Orange Avenue",
            "addressLocality": "San Diego",
            "addressRegion": "CA",
            "postalCode": "94043",
            "addressCountry": "US"
          },
          "telephone": "+966-567495913"
        },
        "pickupTime": "2027-08-05T16:00:00-07:00",
        "dropoffLocation": {
          "@type": "Place",
          "name": "${params.ORDER.destinationAddress}",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1500 Orange Avenue",
            "addressLocality": "San Diego",
            "addressRegion": "CA",
            "postalCode": "94043",
            "addressCountry": "US"
          },
          "telephone": "+966-567495913"
        },
        "dropoffTime": "2027-08-06T20:00:00-07:00",
        "price": "${params.ORDER.price}",
        "priceCurrency": "USD"
      }
      </script>

        Dear ${params?.ORDER.name}, on ${new Date()}
        <h1>Your booking has been confirmed by admin and assigned a chauffeuer</h1>
        <p>Please Go through your travel itenary, the Details of Trip are given below </p>
        
        <div class="card" style="width: 100%">
          <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2" width="500" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Your Booking Details Are Given Below</h5>
            <p class="card-text">
              Thank you for booking with mosooklimo, your trip is confirmed and chauffeur is on the way!
              Hope you have a safe journey. Please read our guidelines and terms and conditions before boarding for smoother experience.
              if you have any queries contact details
              <br>
              Telephone :  +966-920001687. 
              <br>
              Whatsapp :   +966-567495913. 
              <br>
              Email :  booking@mosooklimo.com 
            </p>
            <table id="customers">
              <tr>
                <th>Detail</th>
                <th>Description</th>
              </tr>
              <tr>
                <td>Pickup Address</td>
                <td>${params.ORDER.pickupAddress}</td>
              </tr>
              <tr>
                <td>Destination Address</td>
                <td>${params.ORDER.destinationAddress}</td>
              </tr>
              <tr>
                <td>Pickup Time</td>
                <td>${params.ORDER.bookingTime}${params.ORDER.bookingDate}</td>
              </tr>
              <tr>
                <td>Distance</td>
                <td>${params.ORDER.distance}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>${params.ORDER.price}</td>
              </tr>
              <tr>
                <td>Vehicle</td>
                <td>${params.ORDER.vehicleClass}${params.ORDER?.assignTo.brand}</td>
              </tr>
            </table>
          </div>
        </div>

        <table>
          <tr>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
          <tr>
            <td>${params?.ORDER.name}</td>
            <td>${params?.ORDER.email}</td>
            <td>${params?.ORDER.phone}</td>
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

export default publishEmailCustomer

