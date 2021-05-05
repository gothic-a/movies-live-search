import { useReducer } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import SearchPanel from './SearchPanel'
import MovieInfo from './MovieInfo'
import MoviesList from './MoviesList'

import { reducer, initialState } from '../reducer'
import storeContext from '../storeContext'

import '../styles/common.scss'

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

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
                    </Switch>
                </storeContext.Provider>
            </div>
        </Router>
    )
}

export default App