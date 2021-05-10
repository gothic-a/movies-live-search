const initialState = {
    searchResults: [],
    moviesList: [],
    queryHistory: [],
    loading: true,
    movie: {},
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.payload.movies,
            }
        case 'SET_MOVIES_LIST':
            return {
                ...state,
                loading: false,
                page: action.payload.page,
                moviesList: action.payload.movies.slice(0, 10),
            }
        case 'SET_MOVIE': 
            return {
                ...state,
                loading: false,
                movie: action.payload,
            }
        case 'SET_QUERY_HISTORY': 
            return {
                ...state,
                queryHistory: action.payload
            }
        case 'SET_LOADING': 
            return {
                ...state,
                loading: true,
            }

        default: 
            return state
    }
}

export {
    reducer,
    initialState
}