'use strict';

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use( cors() );
const PORT = process.env.PORT || 3000;
console.log('it works');

