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

app.get('/weather', (request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    console.log(lat, lon);
    if( lat && lon ) {
        let targetCity = weatherDataArray.find((city) => 
        city.lat === lat && city.lon === lon);
        // console.log(targetCity);
        console.log(targetCity.city_name);
        const forecasts = targetCity.data.map((day) => {
            return new Forecast(
              day.valid_date,
              day.weather.description,
              day.max_temp,
              day.low_temp
            );
          });
        forecasts.unshift({city:targetCity.city_name});
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