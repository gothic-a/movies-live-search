import { useEffect, useContext, useState } from 'react'

import { Link } from 'react-router-dom'

import storeContext from '../storeContext'
import { setQueryHistory } from '../actions'

const SearchQueryHistory = ({ dispatch }) => {
    const { state: { queryHistory } } = useContext(storeContext)

    const [queryList, setQueryList] = useState(null)

    useEffect(() => {
        setQueryList(renderQueryList(queryHistory))
    }, [queryHistory])

    const onHistoryClick = (e) => {
        const id = e.target.closest('.history-item').dataset.id
        const title = e.target.closest('.history-item').dataset.title
        dispatch(setQueryHistory(title, id))
    }

    const renderQueryList = (queryHistory) => {
        return queryHistory.map(q => {

            const link = q.id ? `/movie/${q.id}` : `/movies?query=${q.title}`

            return (
                <li 
                    className="history-item" 
                    key={`${q.id}${q.title}`}
                    data-id={q.id}
                    data-title={q.title}>
                    <Link to={link}>
                        <i className="fas fa-history"></i>
                        <p>{ q.title }</p>
                    </Link>
                    
                </li>
            )
        })
    }

    return (
        <ul className="search-query-history"
            onClick={onHistoryClick}>
            {
                queryList
            }
        </ul>
    )
}

export default SearchQueryHistory