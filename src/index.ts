const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
import bodyParser from "body-parser";
const port = process.env.PORT||3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
import { userModel } from "../src/models/user";
import { initDbConnection } from './connection';
import cors from "cors";



const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'contenttype',
        'Accept',
        'X-Access-Token',
        'Authorization',
        'authorization'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "*",
    // preflightContinue: true,
};

//use cors middleware
app.use(cors(options));



app.use(bodyParser.urlencoded(
    {
        extended: false,
        limit: "50mb"
    },
));
app.use(bodyParser.json({ limit: "50mb" }))
app.use((req, res, next) => {
    next();
});

app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { swaggerOptions: { docExpansion: "none" } }));


require('./routes/index')(app);

// listen

app.listen(port, async () => {
    console.log('listen on port', port)
    await initDbConnection();
   
    await userModel();
}).on('error', (e) => {
    console.log('Error:', e.message)
})