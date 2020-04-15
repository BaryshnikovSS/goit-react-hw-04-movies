import React, { lazy, Suspense } from "react";
import { Route, NavLink } from "react-router-dom";
// import Icon from "@material-ui/icons/MovieFilterTwoTone";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const Cast = lazy(() =>
  import("../../cast/Cast" /* webpackChunkName: "movies-details-page-cast" */)
);

const Reviews = lazy(() =>
  import(
    "../../reviews/Reviews" /* webpackChunkName: "movies-details-page-reviews" */
  )
);

// styles

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    minHeight: "72vh",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const css = {
  container: {
    display: "flex",
    paddingBottom: "40px",
  },

  img: {
    display: "block",
    maxWidth: "100%",
    height: "auto",
  },

  info: { padding: "0 40px" },

  aditional: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    padding: "20px",
    marginBottom: "58px",
  }
};

// component

export default function MoviesDetailsCard({ properties, handleClick }) {
  const classes = useStyles();
  const {
    imgURL,
    title,
    date,
    popular,
    overview,
    genres,
    url,
    location,
  } = properties;

  return (
    <React.Fragment>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          <div style={css.container}>
            <Grid item key={0} xs={12} sm={4} md={6}>
              <div style={css.box}>
                <img style={css.img} src={imgURL} alt="title" />
              </div>
            </Grid>
            <Grid item key={1} xs={12} sm={8} md={8}>
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
                        to={{
                          pathname: `${url}/cast`,
                          state: { from: location.state.from },
                        }}
                      >
                        Cast
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={{
                          pathname: `${url}/reviews`,
                          state: { from: location.state.from },
                        }}
                      >
                        Reviews
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  color="primary"
                >
                  Go back
                </Button>
              </div>
            </Grid>
          </div>
          <Suspense fallback={<h1>Loader...</h1>}>
            <Route path="/movies/:id/cast" component={Cast} />
            <Route path="/movies/:id/reviews" component={Reviews} />
          </Suspense>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
