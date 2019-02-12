import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import MovieList from "./components/MovieList";
import MovieItem from "./components/MovieItem";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import config from "./config";

const API_KEY = config.API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.movieSearch();
  }

  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
      )
      .then(res => {
        this.setState({
          movies: res.data.results.slice(0, 20)
        });
      });
  }

  movieSearch = term => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${term}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
      )
      .then(res => {
        this.setState({
          movies: res.data.results
        });
      });
  };

  render() {
    const movieSearch = _.debounce(term => {
      this.movieSearch(term);
    }, 300);
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Searchbar onSearchTermChange={movieSearch} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <MovieList {...props} movies={this.state.movies} /> //pass state to props
              )}
            />
            <Route path="/:movie_id" component={MovieItem} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
