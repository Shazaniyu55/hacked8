import User from "../model/user.js";
import  axios from  "axios";
// import { verify } from 'jsonwebtoken';
// require("dotenv").config();



 const subscriptionFee = async (req, res) => {
  const { email, fname, price, userId } = req.body;

  const paymentData = {
    public_key: process.env.PUBLIC_KEY,
    email: email,
    name: fname,
    currency: 'NGN',
    source: 'docs-html-test',
    user: userId,
    amount: price 
  };

  try {
    // Make the API request to Paystack
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      amount: price * 100,
      currency: 'NGN',
      callback_url: `http://localhost:3100/api/payment/verify-payment?userId=${userId}`,
      email: email,
      name: fname,
    }, {
      headers: {
        Authorization: `Bearer sk_test_0ef643074c6e99bb5e115e092a4bb495a5b63005`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.status) {
      const paymentLink = response.data.data.authorization_url; // This link is where you should redirect the user to
      const tx_ref = response.data.data.reference; // Use the Paystack reference as tx_ref

      // Update paymentData to include the tx_ref from Paystack
      paymentData.tx_ref = tx_ref;

      // Save the payment data to your database
      // const payment = new Subscribe(paymentData);
      // await payment.save();
      
      res.redirect(paymentLink); // Redirect user to the payment page
    } else {
      res.status(400).json({ success: false, message: 'Payment initialization failed' });
    }
  } catch (error) {
    console.error('Error preparing payment redirect:', error);
    res.status(500).json({ success: false, message: 'Failed to prepare payment redirect' });
  }
};


 const verifyPayment = async (req, res) => {
  const { reference, userId, plan} = req.query;

  if (!reference || !userId) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  try {
    // Verify payment with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRETE}`, // Replace with your Paystack secret key
        },
      }
    );

    if (response.data.status && response.data.data.status === 'success') {
      // Payment verified; update user's subscription
     

      return res.redirect('/dashboard');
    } else {
      return res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred during verification' });
  }
};


export default {subscriptionFee, verifyPayment}



