import { useState, useEffect, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'

import storeContext from '../storeContext'
import movieDB from '../services/movieDB'

const MoviesList = () => {
    const movieService = new movieDB() 
    const { state: { moviesList }, dispatch } = useContext(storeContext)

    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery().get('query')

    let temp = moviesList.length ? moviesList[1] : null

    useEffect(async () => {
        const movies = await movieService.getMovies(query)
        dispatch({type: 'SET_MOVIES_LIST', payload: movies})

        return () => dispatch({type: 'SET_MOVIES_LIST', payload: {movies: [], page: null}})
    }, [query])

    const renderMoviesList = (movies) => {
        return movies.map((movie, idx) => {
            return (
                <li className="movies-list-item" key={idx}>
                    <div className="img-wrapper">
                        { movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt=""/> : null }
                    </div>
                    <div className="info">
                        <div>
                            <h3 className="title">{movie.title}</h3>
                            <span className="date">{movie.release_date}</span>
                            <p className="about">{movie.overview}</p>  
                        </div>

                        <Link to={`/movie/${movie.id}`} className="btn-more">more</Link>
                    </div>
                </li>
            )
        })
    }


    return (
        <ul className="movies-list">
            { renderMoviesList(moviesList) }
        </ul>
    )
}

export default MoviesList