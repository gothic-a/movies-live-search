import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { setQueryHistory } from '../actions'

const SearchResultsList = ({ movies, dispatch }) => {

    const [moviesList, setMoviesList] = useState()

    useEffect(() => {
        setMoviesList(renderMoviesList(movies))
    }, [movies])

    const onResultsClick = (e) => {
        const id = e.target.closest('.results-item').dataset.id
        const title = e.target.closest('.results-item').dataset.title
        dispatch(setQueryHistory(title, id))
    }

    const renderMoviesList = (data) => {

        return data.slice(0, 7).map((item, idx) => {
            return (
                <li 
                    className="results-item" 
                    key={idx} 
                    data-id={item.id}
                    data-title={item.title}>
                    <Link 
                        to={`/movie/${item.id}`} 
                        className="results-item-link"
                        >
                        <div className="img-wrap">
                            { item.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt=""/> : null }
                        </div>
                        <div className="info">
                            <p>{item.title}</p>
                            <span>{item.release_date}</span>
                        </div>
                    </Link>
                </li>
            )
        })
    }

    return (
        <ul 
            className='search-results-list' 
            onClick={onResultsClick}
        >
            { 
                moviesList
            }
        </ul>
    )
}

export default SearchResultsList