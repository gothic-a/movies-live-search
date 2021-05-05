import { useContext } from 'react'
import { Link } from 'react-router-dom'
import storeContext from '../storeContext'

const SearchResultsList = () => {

    const { state: { searchResults, loading }, dispatch } = useContext(storeContext) 

    const renderMoviesList = (data) => {

        return data.map((item, idx) => {
            return (
                <li 
                    className="results-item" 
                    key={idx} 
                    data-id={item.id}>
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

    const onListClick = () => dispatch({type: 'SET_SEARCH_RESULTS_VISIBLE', payload: false}) 

    return (
        <ul 
            className='search-results-list' 
            onClick={onListClick}
        >
            { !loading ? ( !!searchResults.length && renderMoviesList(searchResults.slice(0, 7)) ) : null }
        </ul>
    )
}

export default SearchResultsList