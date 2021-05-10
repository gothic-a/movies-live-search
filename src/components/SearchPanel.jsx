import { useState, useEffect, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import useDebounce from '../utils/useDebounce'

import storeContext from '../storeContext'
import movieDB from '../services/movieDB'
import { setQueryHistory } from '../actions'

import SearchDropdown from './SearchDropdown'

const SearchPanel = () => {
    const movieService = new movieDB()  

    const { dispatch } = useContext(storeContext)

    const [inputValue, setInputValue] = useState('')
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef(null)

    const searchRequest = useDebounce(inputValue)
    const history = useHistory()

    const hideDropdownHandler = (e) => {
        if(inputRef.current && !inputRef.current.contains(e.target)) setDropdownVisible(false)
    }

    const inputFocusHandler = () => {
        setDropdownVisible(true)
        document.addEventListener('click', hideDropdownHandler)
    }

    const inputBlurHandler = () => {
        document.removeEventListener('click', hideDropdownHandler)
    }

    const onSearchSubmit = (e) => {
        e.preventDefault()

        if(inputValue) {
            dispatch({type: 'SET_SEARCH_RESULTS', payload: { movies:[] }})
            history.push(`/movies?query=${inputValue}`)
            dispatch(setQueryHistory(inputValue))
            setInputValue('')
            inputRef.current.blur()
        }
    }   

    const onSearchInput = (e) => {
        setInputValue(e.target.value)
        setLoading(true)
    }

    useEffect(() => {
        async function fetchData() {
            if(searchRequest) {
                setLoading(true)
                const movies = await movieService.getMovies(searchRequest)
                dispatch({type: 'SET_SEARCH_RESULTS', payload: movies})
                setLoading(false)
            } else {
                dispatch({type: 'SET_SEARCH_RESULTS', payload: { movies: [] }})
            }
        }

        fetchData()
    }, [searchRequest])

    return (
        <div className={ dropdownVisible ? 'search-panel show-results' : 'search-panel'}>
            <form 
                action="" 
                className="search-panel-field" 
                onSubmit={onSearchSubmit}>
                <input 
                    type="text" 
                    className="search-panel-input" 
                    ref={inputRef}
                    value={inputValue} 
                    onChange={onSearchInput} 
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    />
                <button className="btn" type="submit">search</button>
            </form>
   
            { 
                dropdownVisible 
                    && <SearchDropdown 
                            loading={loading} 
                            inputValue={inputValue} /> 
            }
        </div>
    )
}

export default SearchPanel