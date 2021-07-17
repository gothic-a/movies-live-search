import { useReducer, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import SearchPanel from './SearchPanel'
import MovieInfo from './MovieInfo'
import MoviesList from './MoviesList'
import Home from './Home'

import { reducer, initialState } from '../reducer'
import storeContext from '../storeContext'
import { setQueryHistory } from '../actions'

import '../styles/common.scss'

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch(setQueryHistory())
    }, [])

    return (
        <Router>
            <div className="wrapper">
                <storeContext.Provider value={{ state, dispatch }}>
                    <SearchPanel />
                    <Switch>
                        <Route 
                            path="/movie/:id" 
                            component={MovieInfo}/>

                        <Route 
                            path="/movies" 
                            component={MoviesList}/>
                            
                        <Route 
                            path="/" 
                            component={Home}/>
                            
                    </Switch>
                </storeContext.Provider>
            </div>
        </Router>
    )
}

export default App