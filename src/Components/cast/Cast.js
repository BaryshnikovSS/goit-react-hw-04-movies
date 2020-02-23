import React, { Component } from "react";
import { services } from "../../services/movies-app";
import CastCard from "../../Components/ui/castCard/CastCard";

//styles

const css = {
  container: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    padding: "30px"
  }
};

// component

class Cast extends Component {
  state = { currentCast: [] };

  componentDidMount = async () => {
    const cast = await services.fetchCast();
    this.setState({ currentCast: cast });
  };
  
  render() {
    const { currentCast } = this.state;

    return (
      <div style={css.container}>
        {currentCast.length !== 0 && <CastCard cast={currentCast} />}
      </div>
    );
  }
}

export default Cast;
