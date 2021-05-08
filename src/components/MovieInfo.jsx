import { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import storeContext from '../storeContext'
import Movie from './Movie'
import Spinner from './Spinner'

import movieDB from '../services/movieDB'

const MovieInfo = () => {
    const movieService = new movieDB()
    const { id } = useParams()
    const { state: { movie }, dispatch } = useContext(storeContext)

    const [loading, setLoading] = useState(false)

    useEffect( async () => {
        setLoading(true)

        const movie = await movieService.getMovie(id)
        dispatch({type: 'SET_MOVIE', payload: movie})

        setLoading(false)
    }, [id])

    return (
        <div className="movie-info">
            { loading ? <Spinner /> : Object.keys(movie).length && <Movie {...movie}/>}
        </div>
    )
}

export default MovieInfo