import React, { Component } from "react";
import MediaCard from "../../Components/ui/mediaCard/MediaCard";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import queryString from "query-string";
import { Button } from "@material-ui/core";
import { services } from "../../services/movies-app";

// styles

const css = {
  searchForm: { display: "flex", padding: "20px" },
  textField: { marginRight: "6px" },
  btnLoadBox: { paddingTop: "50px" },
  fixedBtn: {
    border: "4px solid red",
    background: "none",
    outline: "none",
    color: "red",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "50%",
    position: "fixed",
    bottom: "26px",
    right: "20px",
    height: "62px",
    zIndex: "999",
    display: "none",
    transition: "all 0.1s ease",
    cursor: "pointer"
  }
};

// ancillary functions

const getQueryFromLocation = location => {
  const query = queryString.parse(location.search);
  return query.category;
};

//component

class MoviesPage extends Component {
  state = { queryCards: [] };

  componentDidMount() {
    const { location } = this.props;
    const queryArr = getQueryFromLocation(location);

    if(queryArr) {
      this.handleDataWithFirstPage(queryArr);

      window.addEventListener("scroll", this.handleScrollWindow);
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      const { location } = this.props;
      const queryArr = getQueryFromLocation(location);
      this.handleDataWithFirstPage(queryArr);
    }
    
    const { fixedBtn } = this.state;
    
    if (prevState.fixedBtn !== fixedBtn) {
      css.fixedBtn = { ...css.fixedBtn, display: fixedBtn };
    }
  }
  
  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScrollWindow);
  };
  
  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    e.target[0].value = "";

    const { query } = this.state;

    if (query) {
      this.handleDataWithFirstPage(query);

      this.props.history.push({
        ...this.props.location,
        search: `category=${query}`
      });
    }
  };

  handleClick = async () => {
    const { page = 1 } = this.state;

    let query = getQueryFromLocation(this.props.location);

    const nextPage = page + 1;

    const data = await services.fetchSearchMovies(nextPage, query);

    if (data) {
      this.setState(prevState => ({
        queryCards: [...prevState.queryCards, ...data],
        page: nextPage
      }));
    } else return;

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  handleScrollWindow = () => {
    if (window.pageYOffset < 800) {
        this.setState({ fixedBtn: "none" });
    }

    if (window.pageYOffset >= 800) {
        this.setState({ fixedBtn: "block" });
    }
  };

  handleClickScroll = () => {
    window.scrollTo({
      top: "0",
      behavior: "smooth"
    });
  };

  handleDataWithFirstPage = async query => {
    const data = await services.fetchSearchMovies(1, query);
    this.setState({
      queryCards: data
    });
  };

  render() {
    const { queryCards } = this.state;
    const { location } = this.props;

    return (
      <>
        <form
          style={css.searchForm}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            size="small"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={this.handleChange}
            style={css.textField}
          />
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Search
          </Button>
        </form>
        {queryCards.length !== 0 && (
          <>
            <Typography gutterBottom variant="h2" component="h2">
              Request response
            </Typography>
            <MediaCard location={location} card={queryCards} />
            <div style={css.btnLoadBox}>
              <Button onClick={this.handleClick} size="small" color="primary">
                Load more
              </Button>
            </div>
            <Button
              style={css.fixedBtn}
              onClick={this.handleClickScroll}
              size="small"
            >
              UP
            </Button>
          </>
        )}
      </>
    );
  }
}

export default MoviesPage;
