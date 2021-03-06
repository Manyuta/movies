import React from "react";
import { NavLink } from "react-router-dom";

const MovieList = props => {
  
    //receive props from APP searchbar
    const { movies } = props;
    console.log(props);

    const movieList = movies.length ? (
      movies.map(movie => {
        return (
          <div className="card card-small" key={movie.id} >
            <NavLink to={"/" + movie.id}>
              <div className="card-image waves-effect waves-block waves-light">
                <img
                  className="activator"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`poster ${movie.title}`}
                />
              </div>              
            </NavLink>
          </div>
        );
      })
    ) : (
      <div className="center">Please reload the page</div>
    );
    return (
      <div className="container home">
        <div>{movieList}</div>
      </div>
    );
  }


export default MovieList;
