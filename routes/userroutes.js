import express  from 'express';
import hacked from '../controller/usercontroller.js';
import requestIp from "request-ip";
// import { encode } from '../middleware/jwts.js';
const router = express.Router();

import  user from '../controller/usercontroller.js';
// Array to store IP addresses
let userIpList = [];

//get routes
router.get('/course', hacked.getAllCourse);
router.get('/course/:id', hacked.buyCourse);
router.get('/FE-Exam', hacked.getExamFrontend);

//exams login logic based on IP difference..
router.get('/exam-login', (req, res)=>{
         // Get the IP of the client
    const ip = requestIp.getClientIp(req);

    // Check if the IP already exists in the list
    if (!userIpList.includes(ip)) {
        userIpList.push(ip);
        console.log('New IP added:', ip);
    } else {
        console.log('IP already exists:', ip);
    }

    // Respond with a message or additional data
    res.json({ message: 'IP recorded', ip, userIpList });
});


//post routes
router.post('/uploadCourse', hacked.uploadCourse);
router.post('/chat', hacked.createchat);
router.post('/exam-start', hacked.examStart);


router
  .get('/alluser', user.onGetAllUsers)
  .post('/register', user.onCreateUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)




// router
//   .post('/login/:userId', encode, (req, res, next) => {
//     return res
//       .status(200)
//       .json({
//         success: true,
//         authorization: req.authToken,
//       });
//   });

export default router;