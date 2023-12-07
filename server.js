'use strict';

require("dotenv").config();
const axios = require("axios")
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const forecastURL = process.env.WEATHER_URL
const forecastToken = process.env.WEATHER_API_KEY
const movieURL = process.env.MOVIE_URL
const movieToken = process.env.MOVIE_READ_ACCESS_TOKEN


app.use(cors());
app.listen(
    PORT, () => console.log(`listening on ${PORT}`)
);

app.get('/', (request, response) => {
    response.send("Hellooooo");
});

app.get('/weather', async(request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    // console.log(lat, lon);
    if (lat && lon) {
        let apiResponse = await axios.get(`${forecastURL}`,
            { params: {
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
                city.low_temp
            );
        });
        // console.log(forecasts);
        response.json(forecasts);
    } else {
        throw new Error("Sorry. Data for this location does not exist.")
    }
});

app.get('/movies', async(request, response) => {
    let city = request.query.city;
    if (city) {
        let apiResponse = await axios.get(`${movieURL}`, {
            params: {query: `${city}`},
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${movieToken}`
            }
        });
        let movieList = apiResponse.data.results.map(movie => {
            return new Movie(
                movie.title,
                movie.overview,
                movie.popularity,
                movie.release_date
            );
        });
        // sortedMovieList = () => movieList.sort
        console.log(movieList);
        response.json(movieList);
    }
    else {
        throw new Error("Sorry. We are having trouble collecting movie information for this location does not exist.")
    };
});

class Forecast {
    constructor(date, description, maxTemp, lowTemp) {
        this.date = date;
        this.description = description;
        this.maxTemp = maxTemp;
        this.lowTemp = lowTemp;
    };
};
 
class Movie {
    constructor(title, description, popularity, release) {
        this.title = title;
        this.description = description;
        this.popularity = popularity;
        this.release = release;
    };
};

app.get("*", (request, response) => {
    response.status(404).send("Not Found");
});
