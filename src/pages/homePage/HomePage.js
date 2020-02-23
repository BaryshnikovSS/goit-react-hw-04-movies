import React, { Component } from "react";
import MediaCard from "../../Components/ui/mediaCard/MediaCard";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { services } from "../../services/movies-app";

// styles

const css = {
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

// component

class HomePage extends Component {
  state = { movieCards: [] };

  componentDidMount = async () => {
    const data = await services.fetchPopMovies();
    this.setState({ movieCards: data });

    window.addEventListener("scroll", this.handleScrollWindow);
  };

  componentDidUpdate = (_, prevState) => {
    const { fixedBtn } = this.state;

    if (prevState.fixedBtn !== fixedBtn) {
      css.fixedBtn = { ...css.fixedBtn, display: fixedBtn };
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScrollWindow);
  };

  handleScrollWindow = () => {
    if (window.pageYOffset < 800) {
      this.setState({ fixedBtn: "none" });
    }

    if (window.pageYOffset >= 800) {
      this.setState({ fixedBtn: "block" });
    }
  };

  handleClickScroll= () => {
    window.scrollTo({
      top: "0",
      behavior: "smooth"
    });
  };

  render() {
    const { movieCards } = this.state;
    return (
      <>
        <Typography gutterBottom variant="h2" component="h2">
          Trending Today
        </Typography>
        {movieCards.length > 0 && <MediaCard card={movieCards} />}
        <Button style={css.fixedBtn} onClick={this.handleClickScroll} size="small">
          UP
        </Button>
      </>
    );
  }
}

export default HomePage;
