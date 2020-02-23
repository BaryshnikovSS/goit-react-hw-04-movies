import React, { lazy, Suspense } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Icon from "@material-ui/icons/MovieFilterTwoTone";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MoviesPage from "../../../pages/moviesPage/MoviesPage";
import PageNotFound from "../../../pages/pageNotFound/PageNotFound";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Create with Material-ui
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const HomePage = lazy(() =>
  import(
    "../../../pages/homePage/HomePage" /* webpackChunkName: "home-page" */
  )
);

const MovieDetailsPage = lazy(() =>
  import(
    "../../../pages/movieDetailsPage/MovieDetailsPage" /* webpackChunkName: "movies-details-page" */
  )
);

// styles

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    minHeight: '72vh',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(6)
  }
}));

// component

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Icon className={classes.icon} />
          <NavLink
            to="/"
            style={{ color: "white", fontSize: "20px", marginRight: "10px" }}
          >
            Home
          </NavLink>
          <NavLink to="/movies" style={{ color: "white", fontSize: "20px" }}>
            Movies
          </NavLink>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Suspense fallback={<h1>Loader...</h1>}>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/movies/:id" component={MovieDetailsPage} />
              <Route path="/movies" component={MoviesPage} />
              <Route component={PageNotFound} />
            </Switch>
          </Suspense>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography> */}
        {/* <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography> */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
