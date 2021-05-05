import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import useDebounce from '../utils/useDebounce'

import storeContext from '../storeContext'
import movieDB from '../services/movieDB'

import SearchResultsList from './SearchResultsList'

const SearchPanel = () => {
    const movieService = new movieDB()  

    const { state: { searchResultsVisible }, dispatch } = useContext(storeContext)

    const [inputValue, setInputValue] = useState('')
    const searchRequest = useDebounce(inputValue)
    const history = useHistory()

    const onSearchSubmit = (e) => {
        e.preventDefault()
        if(inputValue) {
            dispatch({type: 'SET_SEARCH_RESULTS_VISIBLE', payload: false})
            dispatch({type: 'SET_SEARCH_RESULTS', payload: { movies:[] }})
            history.push(`/movies?query=${inputValue}`)
            setInputValue('')
        }
    }   

    const onSearchInput = (e) => {
        setInputValue(e.target.value)
        dispatch({type: 'SET_SEARCH_RESULTS_VISIBLE', payload: !!e.target.value})
    }

    useEffect(async () => {
        if(searchRequest) {
            dispatch({type: 'SET_LOADING'})
            const movies = await movieService.getMovies(searchRequest)
            dispatch({type: 'SET_SEARCH_RESULTS', payload: movies})
        }
    }, [searchRequest])

    return (
        <div className={ searchResultsVisible ? 'search-panel show-results' : 'search-panel'}>
            <form 
                action="" 
                className="search-panel-field" 
                onSubmit={onSearchSubmit}>
                <input 
                    type="text" 
                    className="search-panel-input" 
                    value={inputValue} 
                    onChange={onSearchInput} />
                <button className="btn" type="submit">search</button>
            </form>
   
            <SearchResultsList />
        </div>
    )
}

export default SearchPanel