import { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'

import storeContext from '../storeContext'
import Movie from './Movie'

import movieDB from '../services/movieDB'

const MovieInfo = () => {
    const movieService = new movieDB()
    const { id } = useParams()
    const { state: { movie }, dispatch } = useContext(storeContext)

    useEffect( async () => {
        const movie = await movieService.getMovie(id)
        dispatch({type: 'SET_MOVIE', payload: movie})

        return () => { 
            dispatch({type: 'SET_MOVIE', payload: {}})
            console.log('unmount')
        }
    }, [id])

    return (
        <div className="movie-info">
            { Object.keys(movie).length && <Movie {...movie}/>}
        </div>
    )
}

export default MovieInfo