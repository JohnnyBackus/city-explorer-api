'use strict';

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const weatherDataArray = require('./data/weather.json');

app.listen(
    PORT, () => console.log(`listening on ${PORT}`)
);

console.log (weatherDataArray[0].city_name)
app.get('/', (request, response) => {
    response.send("Hellooooo");
});

app.get("/weather", (request, response) => {
    let city = request.query.type;
    if( weatherDataArray[type] ) {
        response.json(weatherData[type])
    } else {
        throw new Error("No Such List")
    }