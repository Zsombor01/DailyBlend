import { Movie } from "../components/Movie";

const MovieFlexbox = ({ movieIdList }) => {
    if (movieIdList) {
        return (
            <div className="movies-flexbox flex" >
                {movieIdList.map((movie_id) => (
                    <Movie key={movie_id} movie_id={movie_id} />
                ))}
            </div>
        )
    }
    return <div></div>
}

export { MovieFlexbox }