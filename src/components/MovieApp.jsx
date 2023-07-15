import './MovieApp.css';

import React, { useEffect, useState } from 'react';

const MovieApp = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);

    const handleSearch = async () => {
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
                const randomMovie = movies[randomIndex];

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
    useEffect(() => {
        fetchRandomMovies();
    }, []);

    return (
        <div>
            <header>
                <h1>Movie App</h1>
                <div id="search-container">
                    <input type="text" id="search-input" placeholder="Search By Movie Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button id="search-button" onClick={handleSearch}>Search</button>
                </div>
            </header>
            <main>
                <section id="home">
                    <center><h2>For You</h2></center>
                    <div id="featured-movie">
                        {featuredMovie &&(
                            <div className="movie-card">
                                <img src={
                                    featuredMovie.Poster !== 'N/A'
                                    ? featuredMovie.Poster
                                    : 'placeholder.png'
                                } alt={featuredMovie.Title} />
                                <h3>{featuredMovie.Title}</h3>
                                <p>Year:{featuredMovie.Year}</p>
                                <p>Rated: {featuredMovie.Rated}</p>
                                <p>Runtime: {featuredMovie.Runtime}</p>
                                <p>Genre: {featuredMovie.Genre}</p>
                            </div>
                        )}
                    </div>
                </section>
                <section id="search-results">
                    <h2>Search Results</h2>
                    <div id="movie-container">
                        {movies.map((movie)=>(
                            <div className="movie-card" key={movie.imdbID}>
                                <img 
                                src={movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.png'} 
                                alt={movie.Title} 
                                />
                                <h3>{movie.Title}</h3>
                                <p>Year: {movie.Year}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MovieApp;