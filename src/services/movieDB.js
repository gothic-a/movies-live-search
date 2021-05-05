class movieDB {

    #apiKey = '6f14bb0ba1b5ca6a0116cfaafb3edd27'
    #moviesUrl = `https://api.themoviedb.org/3/search/movie`
    #movieUrl = `https://api.themoviedb.org/3/movie/`
    
    constructUrl(url) {
        return `${url}?api_key=${this.#apiKey}&language=en-US&`
    }

    async getMovies(query, page = 1) {
        const url = `${this.#moviesUrl}?api_key=${this.#apiKey}&query=${query}&page=${page}&language=en-US&`

        let data = await fetch(url)
        data = await data.json()

        return {
            page: data.page,
            movies: data.results,
        }
    }

    async getMovie(id) {
        const movieUrl = `${this.#movieUrl}${id}?api_key=${this.#apiKey}&language=en-US&`
        const castUrl = `${this.#movieUrl}${id}/credits?api_key=${this.#apiKey}&language=en-US&`

        let movie = await fetch(movieUrl)
        movie = await movie.json()

        let cast = await fetch(castUrl)
        cast = await cast.json()

        console.log(movie)

        return this.composeMovie(movie, cast)
    }

    composeMovie({ id, genres, original_title, budget, production_companies, release_date, runtime, overview, poster_path}, {cast, crew}) {

        let directing = crew.find(p => p.department = 'Directing')

        const parseCrew = (crew) => {
            let jobs = []
            let crewList = []

            crew.forEach((p, idx) => {

                if(!crew[idx + 1]) return null;

                if(p.name === crew[idx + 1].name) {
                    jobs.push(p.job)
                    return null;
                } else if(p.name !== crew[idx + 1].name) {
                    jobs.push(p.job)

                    const person = {
                        id: p.id,
                        name: p.name,
                        jobs: [...jobs],
                        profile: p.profile_path
                    }

                    jobs = []
                    crewList.push(person)
                }
            })
            return crewList
        }

        const parseCast = (cast) => {

            return cast.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    character: p.character,
                    profile: p.profile_path,
                    gender: p.gender === 1 ? 'female' : 'male',
                }
            })
        }

        return {
            id,
            genres,
            title: original_title,
            runtime,
            date: release_date,
            budget,
            overview,
            directing: {
                id: directing.id,
                name: directing.name,
            },
            poster: poster_path,
            production: production_companies[0].name,
            people: {
                cast: parseCast(cast.slice(0, 15)),
                crew: parseCrew(crew.slice(0, 20))
            }
        }
    }

}

export default movieDB