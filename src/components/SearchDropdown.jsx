import { useContext } from 'react'
import storeContext from '../storeContext'
import NothingFound from './NothingFound'
import Spinner from './Spinner'

import SearchResultsList from './SearchResultsList'
import SearchQueryHistory from './SearchQueryHistory'

const SearchDropdown = ({ loading, inputValue }) => {

    const { state: { searchResults }, dispatch } = useContext(storeContext) 

    return (
        <div className='search-dropdown' >
            { 
                !inputValue ? <SearchQueryHistory dispatch={dispatch}/> 
                    : loading ? <Spinner /> 
                        : searchResults.length ? <SearchResultsList movies={searchResults} dispatch={dispatch}/>
                            : <NothingFound /> 
            }
        </div>
    )
}

export default SearchDropdown