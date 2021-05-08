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
    const [loading, setLoading] = useState(false)

    const searchRequest = useDebounce(inputValue)
    const history = useHistory()

    const hideHandler = (e) => {
       const panel = document.querySelector('.search-panel')

        if(!panel.contains(e.target) ) {
            dispatch({type: 'SET_SEARCH_RESULTS_VISIBLE', payload: false})

            console.log('click')
        } 

    }

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
        setLoading(true)
        dispatch({type: 'SET_SEARCH_RESULTS_VISIBLE', payload: !!e.target.value})
    }

    useEffect(() => {
        document.body.addEventListener('click', hideHandler)

        async function fetchData() {
            if(searchRequest) {
                const movies = await movieService.getMovies(searchRequest)
                dispatch({type: 'SET_SEARCH_RESULTS', payload: movies})
                setLoading(false)
            }
        }

        fetchData()
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
   
            { searchResultsVisible ? <SearchResultsList loading={loading}/> : null }
        </div>
    )
}

export default SearchPanel