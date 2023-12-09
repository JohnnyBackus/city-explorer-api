'use strict';

const forecastURL = process.env.WEATHER_URL
const forecastToken = process.env.WEATHER_API_KEY

const axios = require("axios")

const cache = {};

async function handleWeather (request, response) {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let cacheKey = `${lat},${lon}`;
    // console.log(lat, lon);
    if (cache[cacheKey]) {
        console.log(`existing cache: ${[cacheKey]}`);
        response.json(cache[cacheKey]);
    } else {
        try {
            let apiResponse = await axios.get(`${forecastURL}`, {
                params: {
                key: forecastToken,
                lat: lat,
                lon: lon
                }
            });
        // console.log(apiResponse.data)
            let forecasts = apiResponse.data.data.map(city => {
            return new Forecast(
                city.valid_date,
                city.weather.description,
                city.high_temp,
                city.low_temp,
                city.weather.icon
            );
        });
        // console.log(forecasts);
        cache[cacheKey] = forecasts;
        console.log(`initial cache: ${[cacheKey]}`);
        response.json(cache[cacheKey]);
        }   catch (error) {
                throw new Error("Sorry. Data for this location does not exist.")
            }
    };
};

class Forecast {
    constructor(date, description, maxTemp, lowTemp, icon) {
        this.date = date;
        this.description = description;
        this.maxTemp = maxTemp;
        this.lowTemp = lowTemp;
        this.icon = icon;
    };
};

module.exports = handleWeather;
