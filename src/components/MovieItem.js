import React, { Component } from "react";
import axios from "axios";
import config from "../config";

const API_KEY = config.API_KEY;

class MovieItem extends Component {
  state = {
    movie: null
  };
  componentDidMount() {
    const id = this.props.match.params.movie_id;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      )
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
          <div className="movie-item-text left-align col s12 m8">
            <h5>
              <b>Overview</b>
            </h5>
            <p>{this.state.movie.overview}</p>
            <p>
              <b>Genres: </b>
              {this.state.movie.genres.map(genre => `${genre.name} `)}
            </p>
            <p className="text-flow">
              <b>Popularity: </b>
              {this.state.movie.popularity}
            </p>
            <p>
              <b>Release date: </b>
              {this.state.movie.release_date}
            </p>
            <p>
              <b>Vote average: </b>
              {this.state.movie.vote_average}
            </p>
            <p>
              <a
                href={this.state.movie.homepage}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to movies' home page
              </a>
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="center">Loading movie...</div>
    );
    return <div className="container">{movie}</div>;
  }
}

export default MovieItem;
