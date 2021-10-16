
const path = require('path');
const express = require('express')
const fs = require('fs');
const dotenv = require('dotenv');

/**
 * Configure env variables
 */
dotenv.config({ path: path.join(__dirname, '.env') });;

const app = express()
const http = require('http')
const axios = require('axios');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

const homeRouter=require('./routes/home.routes');
const exerciseRouter=require('./routes/exercise.routes');






const dbURI = process.env.dbURI;


/**
 * Establish MongoDB Connection
 * @type {module:mongoose}
 */
 var mongo_options = {
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_PASSWORD,
    useNewUrlParser: true
};

mongoose.connect(process.env.MONGO_DB_STRING,
    mongo_options);
/**
 * Create Express server 
 * @type {Server}
 */
//var server = http.createServer(options,app);
const server = http.createServer(app);

/**
 * Use mongo sanitize to avoid SQL injection
 */
 const mongoSanitize = require('express-mongo-sanitize');


/**
 *Register Express middlewares
 */

 app.use(cookieParser());
 app.use(bodyParser.json());
 app.use(cors({credentials: true, origin: true}));
 app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
 // app.use('/peerjs', peerServer)
 
 app.use(express.static('public'))
 app.use(
     mongoSanitize({
         onSanitize: ({ req, key }) => {
             console.warn(`This request[${key}] is sanitized`, req);
         },
     }),
 );
 app.use(bodyParser.json({ limit: '50mb' }));
 app.set('view engine', 'ejs')


app.use('/', homeRouter);
app.use('/exercise/', exerciseRouter);






//start server
const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))