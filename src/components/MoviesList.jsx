import { useState, useEffect, useContext, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'

import storeContext from '../storeContext'
import movieDB from '../services/movieDB'
import Spinner from './Spinner'
import NothingFound from './NothingFound'

const MoviesList = () => {
    const movieService = new movieDB() 
    const { state: { moviesList }, dispatch } = useContext(storeContext)
    const [loading, setLoading] = useState(false)

    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery().get('query')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const movies = await movieService.getMovies(query)
            dispatch({type: 'SET_MOVIES_LIST', payload: movies})
            setLoading(false)
        }

        fetchData()
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

    const movies = useMemo(() => renderMoviesList(moviesList), [moviesList])

    return (
        <ul className="movies-list">
            { loading ? <Spinner /> 
                : movies.length ? movies 
                : <NothingFound /> }
        </ul>
    )
}

export default MoviesList