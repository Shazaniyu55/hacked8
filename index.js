import express  from "express";
const app = express();
import swaggerjsdocs from "swagger-jsdoc";
import  swaggerui from "swagger-ui-express";
const port = 3100;
import  bodyParser from 'body-parser';
import cors from "cors";
import userRoutes from  "./routes/userroutes.js";
import chatRoomRouter from "./routes/chatRooms.js";
import path  from "path";
import  WebSockets from  "./utils/websockets.js";
import http from  "http";
import socketio from "socket.io";
import logger from "morgan";



/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)


const options = {
    definition:{
        openapi: '3.0.0',
        info: {
            title:" Hacked8",
            version:"1.0.0"
        },
        servers:[
            {
                url:'https://hacked-backend.vercel.app/'
            }
        ]
    },
    apis: ['./index.js']
}
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

const swaggerSpec = swaggerjsdocs(options);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: "https://test-theta-sage.vercel.app",          // Removed the trailing slash
    methods: 'GET, POST, PUT, DELETE',       // Methods allowed
    allowedHeaders: 'Content-Type, Authorization' // Corrected 'authorization' to 'Authorization'
  }));
app.options('*', cors())
app.use("/api/auth", userRoutes);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec, {
    customCss:
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
customCssUrl: CSS_URL,
}));
import {ExpressPeerServer} from "peer";
const peerServer = ExpressPeerServer(server,{
    debug: true
});
app.use(logger("dev"));
app.use("/peerjs",peerServer);
app.set('view engine','ejs')
// app.set('views', path.join(__dirname, 'views')); 

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: This API is used to register a new user
 *      description: The API collects JSON data from the frontend to register a new user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullname:
 *                              type: string
 *                              example: John Doe
 *                          phoneNumber:
 *                              type: string
 *                              example: 09074235666
 *                          email:
 *                              type: string
 *                              example: shazaniyu@example.com
 *                          country:
 *                              type: string
 *                              example: Nigeria
 *                          password:
 *                              type: string
 *                              example: shazaniyu2@
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */




/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: This API is used to log in a user
 *      description: Verifies user credentials.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: john.doe@example.com
 *                          password:
 *                              type: string
 *                              example: Password123
 *      responses:
 *          200:
 *              description: Login successful
 *          401:
 *              description: Unauthorized
 */



/**
 * @swagger
 * /api/auth/exam-start:
 *  post:
 *      summary: This API is used to start  a user exams
 *      description: Verifies user credentials.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          examId:
 *                              type: number
 *                              example: 272726727277
 *                          password:
 *                              type: string
 *                              example: Password123
 *      responses:
 *          200:
 *              description: Login successful
 *          401:
 *              description: Unauthorized
 */


/**
 * @swagger
 * /api/auth/uploadCourse:
 *  post:
 *      summary: upload a user course by the admin
 *      description: endpoint to upload a user course to the system.
 *      parameters:
 *          - in: query
 *            name: adminId
 *            required: true
 *            schema:
 *              type: string
 *            description: The ID of the admin to upload a course
 *      requestBody:
 *          require: true
 *          content:
 *             application/jsin:
 *                schema:
 *                   type: object
 *                   properties:
 *                      name:
 *                        type: string
 *                        example: niyu
 *                      description:
 *                         type: string
 *                         example: frontend basics
 *                      title:
 *                         type: string
 *                         example: introduction to HTML
 *      responses:
 *          200:
 *              description: Course Uploaded successfully
 *          404:
 *              description: Upload error not found
 */


/**
 * @swagger
 * /api/payment/buy-course:
 *  post:
 *      summary: This API is used to make a new payment
 *      description: The API collects JSON data from the frontend to register a new user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              example: 67484330b8a5265d16fbad75
 *                          email:
 *                              type: string
 *                              example: shazaniyu@gmail.com
 *                          course:
 *                              type: string
 *                              example: frontend
 *                          amount:
 *                              type: number
 *                              example: 4000
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */




/**
 * @swagger
 * /api/auth/adminlogin:
 *  post:
 *      summary: This API is used to log in a admin
 *      description: Verifies user credentials.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: admin@example.com
 *                          password:
 *                              type: string
 *                              example: admin2@
 *      responses:
 *          200:
 *              description: Login successful
 *          401:
 *              description: Unauthorized
 */



/**
 * @swagger
 * /api/auth/FE-Exam:
 *  get:
 *      summary: This API is used to get all the frontEnd exam on the frontend CBT UI
 *      description: The API collects JSON data from the backend it is left for the frontend developer to collect this data and use it on the frontend .
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */


/**
 * @swagger
 * /api/auth/chat:
 *  post:
 *      summary: This API is used to chat with the admin
 *      description: Verifies user credentials.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: number
 *                              example: 6364646446
 *                          chattext:
 *                              type: string
 *                              example: hello admin!.
 *      responses:
 *          200:
 *              description: chat successful
 *          401:
 *              description: Unsuccessful
 */



/**
 * @swagger
 * /api/auth/course:
 *  get:
 *      summary: This API is used to get all the frontEnd exam on the frontend CBT UI
 *      description: The API collects JSON data from the backend it is left for the frontend developer to collect this data and use it on the frontend .
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */



/**
 * @swagger
 * /:room:
 *  get:
 *      summary: This API is used to add student to a video chat co-working space
 *      description: The API utilizes sockets.io for bi-directional communication
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */


// app.get('/',(req,res) => {
//     // res.send("Hello World")
//     res.redirect(`/${uuidv4()}`);
//   })
  



app.get('/', (req, res)=>{
    res.send('welcome to Hacked8 Api server')
})

// app.get('/:room',(req,res) => {
//     res.render("index",{roomId: req.params.room})
// })

// app.listen(port, ()=>{
//     console.log(`server running at port http://localhost:${port}`)
// });

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});

export default app