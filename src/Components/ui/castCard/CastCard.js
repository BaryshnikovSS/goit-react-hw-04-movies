import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//styles

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    height: 320
  },
  title: {
    padding: "4%"
  },
  media: {
    height: 200,
    paddingTop: "76.25%"
  }
}));

// component

export default function CastCard({ cast }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {cast.map(el => {
          const {id, img, name, character} = el;
        return (
          <Grid item key={id} xs={12} sm={4} md={2}>
            <Card className={classes.root}>
              <Typography className={classes.title} gutterBottom variant="body2"  color="textPrimary" component="h4">
                  {name}
              </Typography>
              <CardMedia
                className={classes.media}
                image={img}
                title={name}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
