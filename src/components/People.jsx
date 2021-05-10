import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

const People = ({ people }) => {

    const [listType, setListType] = useState('cast')
    const [peoplelist, setPeopleList] = useState(null)

    useEffect(() => {
        const list = renderPeopleList(people[listType])
        setPeopleList(list)
    }, [listType])

    const renderPeopleList = (peopleList) => {

        return peopleList && peopleList.map(p => {
            let role = null

            if(listType === 'cast' ) {
                role = <span className="character">{p.character}</span> 
            } else {
                role = <ul className="job-list"> { p.jobs.map(j => <li key={j} className="job">{j}</li>) }</ul> 
            }

            return (<li 
                className="cast-item" 
                key={ p.id }>
                <div className="img-wrap">
                    { p.profile ? <img src={`https://image.tmdb.org/t/p/w500/${p.profile}`} alt="" /> : null}  
                </div>
                <div className="person-info">
                    <Link to="#">
                        <h3 className="name">{ p.name }</h3>
                    </Link>
                    { role }
                </div>
                
            </li>)
        })
    }

    const onSwitchClick = (e) => {
        if(e.target.classList.contains('cast')) setListType('cast')
        if(e.target.classList.contains('crew')) setListType('crew')
    }

    return (
        <div className="movie-people">
            <div className="movie-people-header">
                <h2 className="movie-people-title">{listType}</h2>
                <div className={`switch switch-${listType}`} onClick={onSwitchClick}>
                    <span className="cast">cast</span>
                    <span className="crew">crew</span>
                </div>
            </div>
                     
            <ul className="cast-list">
                { peoplelist }
            </ul>
        </div>
    )
}

export default People