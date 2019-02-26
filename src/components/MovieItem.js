import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import MovieDetails from "./MovieDetails";

const API_KEY = config.API_KEY;
const API_URL = `https://api.themoviedb.org`;

class MovieItem extends Component {
  state = {
    movie: null
  };
  componentDidMount() {
    const id = this.props.match.params.movie_id;

    axios
      .get(`${API_URL}/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(res => {
        this.setState({
          movie: res.data
        });
      });
  }
  render() {
    const movie = this.state.movie ? (
      <div className="movie-item card-large">
        <div className="row">
          <div className="col s12">
            <h4 className="movie-item-title">{this.state.movie.title}</h4>
          </div>
          <div className="col s12 m4">
            <a
              href={this.state.movie.homepage}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                className="movie-item-poster"
                src={`https://image.tmdb.org/t/p/w500/${
                  this.state.movie.poster_path
                }`}
                alt={`poster ${this.state.movie.poster_path}`}
              />
            </a>
          </div>
          <MovieDetails movie={this.state.movie} />
        </div>
      </div>
    ) : (
      <div className="center">Loading movie...</div>
    );
    return <div className="container">{movie}</div>;
  }
}

export default MovieItem;
