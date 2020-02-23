import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// styles

const useStyles = makeStyles(theme => ({
  cardGrid: {
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
  }
}));

// component

const MediaCard = ({ card, location }) => {
  const classes = useStyles();
  // console.log(location)
  return (
    <>
      <Grid container spacing={4}>
        {card.map(el => (
          <Grid item key={el.id} xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={el.imgURL}
                title={el.id}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {el.title}
                </Typography>
                <Typography>{el.overview}</Typography>
              </CardContent>
              <CardActions>
                <Link
                  to={{
                    pathname: `/movies/${el.id}`,
                    state: { from: location }
                  }}
                >
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MediaCard;
