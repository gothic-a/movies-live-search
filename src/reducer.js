const initialState = {
    searchResults: [],
    searchResultsVsisible: false,
    moviesList: [],
    loading: true,
    movie: {},
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                loading: false,
                searchResults: action.payload.movies,
            }
        case 'SET_MOVIES_LIST':
            return {
                ...state,
                loading: false,
                page: action.payload.page,
                moviesList: action.payload.movies,
            }
        case 'SET_MOVIE': 
            return {
                ...state,
                loading: false,
                movie: action.payload,
            }
        case 'SET_LOADING': 
            return {
                ...state,
                loading: true,
            }
        case 'SET_SEARCH_RESULTS_VISIBLE': 
            return {
                ...state,
                searchResultsVisible: action.payload,
            }

        default: 
            return state
    }
}

export {
    reducer,
    initialState
}