const setQueryHistory = (title, id = '') => {
    if(!localStorage.queryHistory) localStorage.queryHistory = JSON.stringify([])

    let history = JSON.parse(localStorage.queryHistory).slice(0, 7)

    if(!title) {
        return {type: 'SET_QUERY_HISTORY', payload: history}
    } else {

        const idx = history.findIndex(q => q.title === title)
        if(idx !== -1) {
            history = [
                history[idx],
                ...history.slice(0, idx),
                ...history.slice(idx + 1)
            ]
        } else {
            history = [{title, id}].concat(history)
        }
        
        localStorage.queryHistory = JSON.stringify(history)

        return {type: 'SET_QUERY_HISTORY', payload: history}
    }
}

export { setQueryHistory }