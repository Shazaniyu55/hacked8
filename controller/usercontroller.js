import User from "../model/user.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
// const bcrypt = require("bcryptjs");
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import courseData from '../coursedata.js';
import Frontend  from "../cbtdatafrontend.js";
import frontendExamData from "../cbtdatafrontend.js";
import Course from "../model/course.js";
// import Chat from "../model/chat.js";
import { v4 as uuidv4 } from 'uuid';
import cloudinary from "../cloudinary.js";
import streamifier from 'streamifier';
dotenv.config();
// utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel, { USER_TYPES } from '../model/user.js';

function calculateProgress(course) {
    const totalTopics = course.topics.length;
    const completedTopics = course.topics.filter(topic => topic.completed).length;
    return ((completedTopics / totalTopics) * 100).toFixed(2); // Progress in percentage
}

// Example Usage
courseData.forEach(course => {
    console.log(`Progress for ${course.title}: ${calculateProgress(course)}%`);
});


function markTopicComplete(courseId, topicId) {
    const course = courseData.find(c => c.id === courseId);
    if (!course) {
        console.error("Course not found");
        return;
    }

    const topic = course.topics.find(t => t.id === topicId);
    if (!topic) {
        console.error("Topic not found");
        return;
    }

    topic.completed = true;
    console.log(`Marked "${topic.title}" as complete in "${course.title}"`);
}

// Example Usage
markTopicComplete("2", "2.1"); // Marks the first topic of the first course as complete
console.log(courseData[1].topics); // Check updated status



//function to request a password rest
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "Failed", message: "Email does not exist in our records." });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Save the reset token and its expiry date in the user record
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Set up email transporter
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Send password reset email
        //const resetUrl = `http://localhost:3500/reset-password`;
        const resetUrl = `http://localhost:3100/reset-password?token=${resetToken}`;
        await transporter.sendMail({
            from: 'mail-crm@gmail.com',
            to: `${email}`,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                   <a href="${resetUrl}">Reset Password</a>
                   <p>If you did not request this, please ignore this email.</p>`
        });

        res.status(200).json({ status: "Success", message: "Password reset email sent successfully Check Your Mail." });


    } catch (error) {
        console.error("Error sending password reset email:", error);
        res.status(500).json({ status: "Failed", message: error.message });
    }
};

const createchat = async(req, res)=>{
    const {userId, chattext} = req.body;
    
    try {

        if(!userId|| !chattext){
            res.status(400).json({status:"failed", message:"invalid user"})
        }else{
            const initiateChat = new Chat({
                user: userId,
                text: chattext
            });
            
          await  initiateChat.save()
          res.status(200).json({status:"success", mesaaeg: "chat sent"})
        }
        
    } catch (error) {
        res.status(500).json({status:'internal server error', message: error})
    }
}

//function to reset password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Find the user by reset token
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() } // Check if token is expired
        });

        if (!user) {
            return res.status(400).json({ status: "Failed", message: "Invalid or expired token." });
        }

        // Hash the new password
        //const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password and clear reset token
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({
            status: "Success",
            message: "Password update successfully",
          });
        // Redirect to login page after successful password update
        //res.redirect('/login'); // Adjust the path as needed for your login route

    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ status: "Failed", message: error.message });
    }
};

const signUp = async (req, res) => {
    try {
      const { fullname, phoneNumber, email,country,  password } = req.body;
  //console.log(fullname, phoneNumber)
      if (!fullname || !phoneNumber || !country  || !email || !password) {
        return res.status(400).json({ status: "Failed", message: "Please fill out all fields." });
        
      }
  



      async function createuser(){

         // Create a new user with the provided data and the image URL if available
      const user = new User({
        fullname,
        phoneNumber,
        country,
        email,
        password,
      
        
      });

    


    


        try {
            await user.save();
            //await payment.save();
           
            // Generate a JWT token
            const token = jwt.sign({ id: user._id}, 'Adain', { expiresIn: '1h' });

           
            res.status(200).json({
                status: "Success",
                message: "Login successful",
                token,
                user
            });
            
        } catch (error) {
            console.error('Error saving user:', error);
                res.status(500).send('Error saving user');
        }
      }
  
     
  
      createuser()
  
     
    } catch (error) {
      console.error("Error during signup:", error);
  
      // Handle errors and ensure only one response
      if (!res.headersSent) {
        res.status(500).json({ status: "Failed", message: error.message });
      }
    }
};


const updateUser = async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.session.user || !req.session.user.id) {
            return res.status(401).json({ status: "Failed", message: "Unauthorized" });
        }

        // Get the user ID from the session
        const userId = req.session.user.id;

        // Build the update object
        const updateData = {};

        if (req.body.fullname) updateData.fullname = req.body.fullname;
        if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
        if (req.body.country) updateData.country = req.body.country;

        // Check if a file was uploaded
        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
                if (error) {
                    return res.status(500).json({ status: "Failed", message: error.message });
                }

                // Save the Cloudinary URL to updateData
                updateData.profilePic = result.secure_url;

                // Update the user in the database
                const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

                if (!user) {
                    return res.status(404).json({ status: "Failed", message: "User not found" });
                }

                // Update user information in the session if needed
                req.session.user = {
                    ...req.session.user,
                    ...updateData,
                };

                // Redirect or respond with success
                res.redirect('/niyu');
            });

            req.file.stream.pipe(result);
        } else {
            // If no file was uploaded, update the user without changing the profile picture
            const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

            if (!user) {
                return res.status(404).json({ status: "Failed", message: "User not found" });
            }

            // Update user information in the session if needed
            req.session.user = {
                ...req.session.user,
                ...updateData,
            };

            // Redirect or respond with success
            res.redirect('/niyu');
        }
    } catch (error) {
        res.status(500).json({ status: "Failed", message: error.message });
    }
};

const examStart = async(req, res)=>{
    const {userId} = req.body;
    try {
        if(!userId){
            res.status(400).json({status:"failed", message: "invalid user"})
        }else{
            const examId = generateExamId(userId);
            res.status(200).json({status:"success", message: examId})
        }
        
    } catch (error) {
        res.status(500).json({status:"failed", message: error})
    }
}


const getUserById = async(userId)=>{
    const user = await User.findById(userId);
    console.log(user)
    if (!user) {
        console.log("user not found")
    }else{
        return user;
    }
}


//function to send message to us......
const message = (req, res)=>{
    const {fullname, email, message, subject} = req.body;
     //console.log(fullname, email, message, subject)
    const transporter = nodemailer.createTransport({
        service:  process.env.SERVICE,
        auth:{
            user: process.env.EMAIL,
            pass :process.env.EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized: false
        }
    })

     // Setup email data
     let mailOptions = {
        from: 'shazaniyu@gmail.com', // Sender address
        to: 'shazaniyu@gmail.com', // List of recipients
        subject: 'ATWAP', // Subject line
        text: `Name: ${fullname}\n Subject:${subject}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
        // You can add HTML to the email if needed
        // html: '<p>Name: ' + name + '</p><p>Email: ' + email + '</p><p>Message: ' + message + '</p>'
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
          res.status(200).json({status:"Success", message: "Email Deliver"});
          //res.render('email')
          //alert("email delivered")
    });
};

//function to reset password
const renderResetPasswordPage = async (req, res) => {
    const { token } = req.query;

    try {
        // Validate the reset token
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() } // Check if token is expired
        });

        if (!user) {
            return res.status(400).render('error', { message: "Invalid or expired token." });
        }

        // Render the password reset page with the token
        res.status(200).json({status:"sucess", message:"password rest", token});
        //res.render('resetPassword', { token });
    } catch (error) {
        console.error("Error rendering password reset page:", error);
        res.status(500).render('error', { message: error.message });
    }
};



const getAllCourse = (req, res)=>{

    res.status(200).json({status: "success", courseData})
}


const buyCourse = (req, res)=>{
            const {id} = req.params;
            const course = courseData.find((p)=> p.id === id);

            if (!course) {
                return res.status(404).json({status: "failed",  messsage:'Product not found'});
            }

     res.status(200).json({status: "success", course})
}


const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ status: "Failed", message: "Invalid email or password" });
        }

        if (!req.session) {
            return res.status(500).json({ status: "Failed", message: "Session is not initialized" });
        }

        req.session.user = {
            user_id: user._id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            profilePic: user.profilePic
        };

        res.redirect('/dashboard');

    } catch (error) {
        console.error("Error during login:", error);

        if (!res.headersSent) {
            res.status(500).json({ status: "Failed", message: error.message });
        }
    }
};


const getExamFrontend = (req, res)=>{
    res.status(200).json({status: "success", frontendExamData})
}

const uploadCourse = async(req, res)=>{
    const {adminId} = req.query
    const {name, description, title} = req.body;

    try {
     

        if(!name || !description || !title){
            res.status(400).json({status: "failed", message: "invalid admin"})
        }else{
            const uploadedCourse = new Course({
                name,
                title,
                createdBy: adminId,
                description,
                
            })
    
            await uploadedCourse.save();
            res.status(200).json({status: "success", message: "course uploaded successfully"})
        }
    
    
        
    } catch (error) {
        res.status(500).json({status: "internal server error", error})
    }





}




// Function to generate a unique examId
const generateExamId = (userId) => {
    const examId = `${userId.toString()}-${uuidv4()}`;
    return examId;
  };


// API route to handle profile image upload
const addImage = async(req, res)=>{
    try {
        const {userId} = req.body
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
    
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "profile_pictures" },
          async (error, result) => {
            if (error) return res.status(500).json({ error: error.message });
    
            // Save the image URL to your database (example)
            const imageUrl = result.secure_url;
    
            // Assuming you have a user model (MongoDB example)
            await User.findByIdAndUpdate(userId, { profilePic: imageUrl });
    
            res.json({ imageUrl });
          }
        );
    
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}


  export default {
    addImage,
    getUserById,
    signUp, 
    logIn, 
    message, 
    updateUser, 
    requestPasswordReset, 
    resetPassword, 
    renderResetPasswordPage,
    getAllCourse,
    buyCourse,
    getExamFrontend,
    uploadCourse,
    createchat,
    examStart,
    onGetAllUsers: async (req, res) => {
      try {
        const users = await UserModel.getUsers();
        return res.status(200).json({ success: true, users });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
    onGetUserById: async (req, res) => {
      try {
        const user = await UserModel.getUserById(req.params.id);
        return res.status(200).json({ success: true, user });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
    onCreateUser: async (req, res) => {
      try {
        const validation = makeValidation(types => ({
          payload: req.body,
          checks: {
            firstName: { type: types.string },
            lastName: { type: types.string },
            email: {type: types.string},
            password:{type: types.string},
            type: { type: types.enum, options: { enum: USER_TYPES } },
          }
        }));
        if (!validation.success) return res.status(400).json({ ...validation });
  
        const { firstName, lastName, email, password, type } = req.body;
        const user = await UserModel.createUser(firstName, lastName, email, password, type);
        return res.status(200).json({ success: true, user });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
    onDeleteUserById: async (req, res) => {
      try {
        const user = await UserModel.deleteByUserById(req.params.id);
        return res.status(200).json({ 
          success: true, 
          message: `Deleted a count of ${user.deletedCount} user.` 
        });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
    },
  }

// export default =
// {
//     getUserById,
//     signUp, 
//     logIn, 
//     message, 
//     updateUser, 
//     requestPasswordReset, 
//     resetPassword, 
//     renderResetPasswordPage,
//     getAllCourse,
//     buyCourse,
//     getExamFrontend,
//     uploadCourse,
//     createchat,
//     examStart,
    
    

// };