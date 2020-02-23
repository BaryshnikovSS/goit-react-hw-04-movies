import React, { Component, lazy, Suspense } from "react";
import { Route, NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { services } from "../../services/movies-app";

const Cast = lazy(() =>
  import(
    "../../Components/cast/Cast" /* webpackChunkName: "movies-details-page-cast" */
  )
);

const Reviews = lazy(() =>
  import(
    "../../Components/reviews/Reviews" /* webpackChunkName: "movies-details-page-reviews" */
  )
);

// styles

const css = {
  container: { display: "flex", paddingBottom: "40px" },

  img: {
    display: "block",
    maxWidth: "100%",
    height: "auto"
  },

  info: { padding: "0 40px" },

  aditional: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    padding: "20px",
    marginBottom: "58px"
  }
};

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
    const {
      imgURL,
      title,
      date,
      popular,
      overview,
      genres
    } = this.state.currentMovie;

    const { location, match: {url} } = this.props;

    return (
      <>
        <div style={css.container}>
          <div>
            <img src={imgURL} alt="" />
          </div>
          <div style={css.info}>
            <Typography gutterBottom variant="h5" component="h2">
              {`${title} (${date})`}
            </Typography>
            <p>Use score: {popular}</p>
            <h4>Owerview</h4>
            <p>{overview}</p>
            <h4>Genres</h4>
            <p>{genres}</p>
            <div style={css.aditional}>
              <h4>Aditional information</h4>
              <ul>
                <li>
                  <NavLink
                    to={{ pathname: `${url}/cast`, state: { from: location.state.from } }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={{
                      pathname: `${url}/reviews`,
                      state: { from: location.state.from }
                    }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
            <Button
              onClick={this.handleClick}
              variant="outlined"
              color="primary"
            >
              Go back
            </Button>
          </div>
        </div>
        <Suspense fallback={<h1>Loader...</h1>}>
          <Route path="/movies/:id/cast" component={Cast} />
          <Route path="/movies/:id/reviews" component={Reviews} />
        </Suspense>
      </>
    );
  }
}

export default MovieDetailsPage;
