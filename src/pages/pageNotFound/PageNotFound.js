import React from "react";

// styles

const css = {
  container: {
    display: "flex",
    justifyContent: "center"
  },

  img: { 
    maxWidth: "100%", 
    maxHeight: "80vh" 
  }
};

// component

const PageNotFound = () => (
  <div style={css.container}>
    <img
      style={css.img}
      src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-3.png"
      alt="Page Not Found!"
    />
  </div>
);

export default PageNotFound;
