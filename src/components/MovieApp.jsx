import './MovieApp.css';

import React, { useEffect, useState } from 'react';

const MovieApp = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);

    const haldleSearch = async () => {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=d9b316c&s=${searchTerm}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
            setMovies(data.Search);

        } else {
            setMovies([]);
        }
    };

    const fetchRandomMovies = async () => {
        const response = await fetch(
            'https://www.omdbapi.com/?apikey=d9b316c&s=action&type=movie&page=1'
        );
        const data = await response.json();

        if (data.Response === 'True') {
            const movies = data.Search;

            if (movies.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.length);
                const randomMovies = movies[randomIndex];

                const movieResponse = await fetch(
                    `https://www.omdbapi.com/?apikey=d9b316c&i=${randomMovie.imdbID}`
                );
                const movieData = await movieResponse.json();

                if (movieData.Response === 'True') {
                    setFeaturedMovie(movieData);
                } else {
                    setFeaturedMovie(null);
                }
            }
        }
    };
    useEffect(()=>{
        fetchRandomMovies();
    },[]);

    return(
        <div>
            <header>
                <h1>Movie App</h1>
                <div id="search-container">
                    <input type="text" id="search-input" placeholder="Search By Movie Name" value={searchTerm}  />
                </div>
            </header>
        </div>
    )
}