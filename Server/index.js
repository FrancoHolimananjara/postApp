const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cors = require('cors');
require('dotenv').config();

//CREATE SERVER
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST
//ROUTING
app.use('/api',routes);
//LISTENING SERVER
app.listen(PORT,()=>{
    console.log(`Server running on ${HOST}:${PORT}`);
})