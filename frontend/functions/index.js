const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("working fine"));

app.post("/payments/create", async (request, response) => {
  let total = request.query.total;
  if (Number(total) == 0) response.status(200)
  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  total = Number(total).toFixed(0);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
    description: "indian tansac",
    shipping: {
      name: "ritesh",
      address: {
        line1: '123 Street',
        postal_code: '12345',
        city: 'New York',
        state: 'NY',
        country: 'US',
      },
    }
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://127.0.0.1:5001/ritbackend/us-central1/api