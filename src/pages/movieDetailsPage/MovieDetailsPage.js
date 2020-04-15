import React, { Component } from "react";
import { services } from "../../services/movies-app";
import MovieDetailsCard from '../../Components/ui/movieDetailsCard/MovieDetailsCard'

// component

class MovieDetailsPage extends Component {
  state = { currentMovie: {} };

  componentDidMount = async () => {
    const { id } = this.props.match.params;

    const data = await services.fetchMoviesInfo(id);
    this.setState({
      currentMovie: { ...data }
    });
  };

  handleClick = () => {
    const { location, history } = this.props;
    
    if (location.state.from) {
      history.push(location.state.from);
    } else {
      history.push("/");
    }
  };

  render() {

    const { location, match: {url} } = this.props;
    const properties = {...this.state.currentMovie, location, url};

    return (
        <MovieDetailsCard properties={properties} handleClick={this.handleClick}/>
    );
  }
}

export default MovieDetailsPage;