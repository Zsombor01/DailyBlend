import { Movie } from "../components/Movie";

const MovieFlexbox = ({ movieIdList }) => {
    return (
        <div className="movies-flexbox flex" >
            {movieIdList.map((movieId)=>(
                <Movie movieId={movieId} />
            ))}
        </div>
    )
}

export { MovieFlexbox }