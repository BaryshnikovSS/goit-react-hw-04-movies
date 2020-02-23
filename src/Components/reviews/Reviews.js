import React, { Component } from "react";
import ReviewsNotFound from "./reviewsNotFound/ReviewsNotFound";
import ReviewCard from '../ui/reviewCard/ReviewCard'
import {services} from "../../services/movies-app";

//styles

const css = {
  container: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
    padding: "20px",
    marginBottom: "30px"
  }
};

// component

class Reviews extends Component {
  state = { currentReviews: [] };

    componentDidMount = async () => {
      const reviews = await services.fetchReviews();
      this.setState({ currentReviews: reviews });
    };

  render() {
    const { currentReviews } = this.state;
    return (
      <>
        {currentReviews.length > 0 && (
          <div style={css.container}><ul>
            {currentReviews.map(el => (
              <ReviewCard key={el.id} review={el} />
            ))}
          </ul></div>
        )}
        {currentReviews.length === 0 && <ReviewsNotFound />}
      </>
    );
  }
}

export default Reviews;
