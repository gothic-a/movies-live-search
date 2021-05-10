import { Link } from 'react-router-dom'

const Movie = ({id, genres, title, runtime, budget, overview, poster, production, date, directing}) => {

    const _runtime = `${Math.floor(runtime / 60)}h ${runtime - (Math.floor(runtime / 60) * 60 )}m` 

    return (
        <div className="movie" id={id}>
            <div className="movie-poster-wrap">
                { poster ? <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt=""/> : null }
            </div>
            <div className="movie-describe">
                <h2 className="title">{ title }</h2>
                <div className="under-title">
                    <span className="studio">{ production }</span>
                    <span className="date">Release: { date || 'unknown' }</span>
                </div>
                
                <p className="overview">{ overview }</p>

                <div className="movie-ditails">
                    <h4 data-directing-id={directing.id}><span>directing:</span> { directing.name || 'unknown' }</h4>
                    <h4><span>runtime:</span> { _runtime }</h4>
                    <h4><span>budgete:</span> { budget } $</h4>
                    <ul className="genres">
                        {
                            genres.map((g, idx) => {
                                const name = genres[idx + 1] ? `${g.name},` : g.name 

                                return <Link to="#" key={idx}>{ name }</Link>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Movie

