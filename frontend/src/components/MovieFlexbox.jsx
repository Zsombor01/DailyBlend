import { Movie } from "../components/Movie";

const MovieFlexbox = ({ movieIdList }) => {
    return (
        <div className="movies-flexbox flex" >
            {movieIdList.map((movie_id)=>(
                <Movie movie_id={movie_id} />
            ))}
        </div>
    )
}

export { MovieFlexbox }