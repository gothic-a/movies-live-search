import { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import storeContext from '../storeContext'

import Movie from './Movie'
import People from './People'
import Spinner from './Spinner'

import movieDB from '../services/movieDB'

const Container = ({ movie }) => {
    return (
        <>
            <Movie {...movie}/> 
            <People people={movie.people} /> 
        </>
    )
}

const MovieInfo = () => {
    const movieService = new movieDB()
    const { id } = useParams()
    const { state: { movie }, dispatch } = useContext(storeContext)

    const [loading, setLoading] = useState(false)

    useEffect( () => {
        const fetchData = async () => {
            setLoading(true)

            const movie = await movieService.getMovie(id)
            dispatch({type: 'SET_MOVIE', payload: movie})
    
            setLoading(false)
        }

        fetchData()
    }, [id])

    return (
        <div className="movie-info">
            { loading ? <Spinner /> 
                : Object.keys(movie).length 
                    ? <Container movie={movie}/> : null } 
        </div>
    )
}

export default MovieInfo