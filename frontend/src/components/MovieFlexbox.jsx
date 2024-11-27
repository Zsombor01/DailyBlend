import { Movie } from "../components/Movie";

const MovieFlexbox = ({ movieIdList }) => {
    if (movieIdList) {
        return (
            <div className="movies-flexbox flex" >
                {movieIdList.map((movieID) => (
                    <Movie key={movieID} movieID={movieID} />
                ))}
            </div>
        )
    }
    return <div></div>
}

export { MovieFlexbox }