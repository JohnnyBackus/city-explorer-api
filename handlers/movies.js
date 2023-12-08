'use strict';

const movieURL = process.env.MOVIE_URL
const movieToken = process.env.MOVIE_READ_ACCESS_TOKEN

const axios = require("axios")


async function handleMovies (request, response) {
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
                movie.release_date,
                movie.poster_path
            );
        });
        movieList.sort((a, b) => b.popularity - a.popularity);
        console.log(movieList);
        response.json(movieList);
    }
    else {
        throw new Error("Sorry. We are having trouble collecting movie information for this location does not exist.")
    };
};

class Movie {
    constructor(title, description, popularity, release, image) {
        this.title = title;
        this.description = description;
        this.popularity = popularity;
        this.release = release;
        this.img_url = `https://image.tmdb.org/t/p/w500${image}`;
    };
};

module.exports = handleMovies;
