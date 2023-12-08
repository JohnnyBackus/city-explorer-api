'use strict';

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const cors = require("cors");
const handleMovies = require("./handlers/movies");
const handleWeather = require("./handlers/weather");

const app = express();

app.use(cors());
app.listen(
    PORT, () => console.log(`listening on ${PORT}`)
    );
    
app.get('/', handleHomePage);
app.get('/weather', handleWeather);
app.get('/movies', handleMovies);
app.get("*", handleNotFound);
app.use(errorHandler);
    
function handleHomePage (request, response) {
    response.status(200).send("Hellooooo");
};

function handleNotFound (request, response) {
    response.status(404).send("Uh oh! This link does not appear to exist.")
};

function errorHandler (error, request, response, next) {
    response.status(500).send("Server Error: I'm sorry, we could not send your request!")
}
