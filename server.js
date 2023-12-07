'use strict';

require("dotenv").config();
// import axios from 'axios';
const axios = require("axios")
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const forecastURL = process.env.WEATHER_URL
// const weatherDataArray = require('./data/weather.json');

app.listen(
    PORT, () => console.log(`listening on ${PORT}`)
);

// console.log (weatherDataArray[0].city_name)
app.get('/', (request, response) => {
    response.send("Hellooooo");
});



app.get('/weather', async(request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    console.log(lat, lon);
    if (lat && lon) {
        let apiResponse = await axios.get(`${forecastURL}`,
            {
                params: {
                    key: process.env.WEATHER_API_KEY,
                    lat: lat,
                    lon: lon
                }
            });
        console.log(apiResponse.data)
        let forecasts = apiResponse.data.data.map(city => {
            return new Forecast(
                city.valid_date,
                city.weather.description,
                city.high_temp,
                city.low_temp
            );
        });
        // // console.log(targetCity);
        // console.log(targetCity.city_name);
        // forecasts.unshift({city:targetCity.city_name});
        console.log(forecasts);
        response.json(forecasts);
    } else {
        throw new Error("Sorry. Data for this location does not exist.")
    }
    });
    
    class Forecast {
        constructor(date, description, maxTemp, lowTemp) {
            this.date = date;
            this.description = description;
            this.maxTemp = maxTemp;
            this.lowTemp = lowTemp;
        };
    };
    
    app.get("*", (request, response) => {
        response.status(404).send("Not Found");
    });