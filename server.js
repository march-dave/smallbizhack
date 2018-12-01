const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const multer = require('multer');
const Stripe = require('stripe');
const uuidv4 = require('uuid/v4');

const apiKeySecret = 'sk_test_p400mgzsN1bhB9vnIvubRhbp';

const app = express();
const stripe = Stripe(apiKeySecret);
const upload = multer();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
});

app.get('/test', (req, res) => {
  const html = `
    <p>Welcome. Be sure to configure your Stripe test mode secret key after you have forked this sandbox.</p>
  `;
  res.send(html);
});

app.post('/gator/rent/checkout', upload.none(), cors(), async (req, res) => {
  console.log(JSON.stringify(req.body));

  let error;
  let status = 'failed';
  try {
    const {
      product,
      quantity,
      csrfToken,
      currency = 'usd',
      description,
      stripeBillingAddressCity,
      stripeBillingAddressCountry,
      stripeBillingAddressLine1,
      stripeBillingAddressState,
      stripeBillingAddressZip,
      stripeBillingName,
      stripeEmail,
      stripeShippingAddressCity,
      stripeShippingAddressCountry,
      stripeShippingAddressLine1,
      stripeShippingAddressState,
      stripeShippingAddressZip,
      stripeShippingName,
      stripeToken,
      stripeTokenType,
    } = req.body;

    // TODO: Assert not a CSRF.

    let amount;
    if (product === 'one-for-five') {
      amount = quantity * 500;
    } else if (product === 'two-for-nine') {
      amount = quantity * 900;
    }

    // TODO: Lookup existing customer or create a new customer.
    // TODO: Save relevant billing and shipping address information.
    const customer = await stripe.customers.create({
      email: stripeEmail,
      source: stripeToken,
      metadata: {
        userId: req.user.id,
      },
    });

    if (stripeTokenType === 'card') {
      const idempotency_key = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount,
          currency: currency,
          customer: customer.id,
          description: description,
        },
        {
          idempotency_key,
        }
      );
      console.log('charge:');
      console.log(JSON.stringify(charge));
    } else {
      throw Error(`Unrecognized Stripe token type: "${stripeTokenType}"`);
    }

    status = 'success';
  } catch (err) {
    console.error(err);
    error = err;
  }

  res.json({ error, status });
});

app.listen(port, () => {
    console.info(`Express Listening on Port: ${port}`);
});

