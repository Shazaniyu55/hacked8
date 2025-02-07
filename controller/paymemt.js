import UserModel from "../model/user.js";
import  axios from  "axios";
import CourseModel from '../model/course.js';
import courseData from '../coursedata.js';
import mongoose from 'mongoose';
// import { verify } from 'jsonwebtoken';
// require("dotenv").config();



 const subscriptionFee = async (req, res) => {
  const { email, fname, price, userId, coursename, coursedesc, courseImg, coursetopics, pdfurl  } = req.body;
// Parse coursetopics if it's a string
 const topics = JSON.parse(coursetopics);
 console.log(topics)

  const paymentData = {
    email: email,
    name: coursename,
    user: userId,
    img:courseImg,
    amount: price ,
    ispaid: true,
    description: coursedesc,
    topics:topics,
    pdf:pdfurl


  };

  console.log(paymentData)

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
      const payment = await CourseModel.create(paymentData);
      //await payment.save();
      
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
  const { reference, userId, courseId } = req.query;

  try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: {
              Authorization: `Bearer sk_test_0ef643074c6e99bb5e115e092a4bb495a5b63005`
          }
      });

      if (response.data.status && response.data.data.status === 'success') {
        // const course = await CourseModel.findById(courseId);
        // if (!course) {
        //     return res.status(404).json({ success: false, message: 'Course not found' });
        // }
          // Update the user's course status
          const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { purchasedCourses: new mongoose.Types.ObjectId(courseId) } }, // Avoid duplicate entries
            { new: true }
        );
         return res.redirect('/dashboard');
        //res.json({ success: true, message: 'Payment verified, course unlocked', user: updatedUser });
      } else {
          res.status(400).json({ success: false, message: 'Payment verification failed' });
      }
  } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ success: false, message: 'Payment verification error' });
  }
};

export default {subscriptionFee, verifyPayment}



