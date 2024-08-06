
import { Grid } from '@mui/material'
import React from 'react'
import Movie from '../Movie/Movie';
 import useStyles from './styles'

function MovieList({ movies, numberOfMovies, excludeFirst }) {
    const classes = useStyles();
    const startFrom = excludeFirst ? 1 : 0;
    return (
      <Grid container className={classes.movieContainer}>
        {movies?.results?.slice(startFrom, numberOfMovies)?.map((movie, index) => (
          <Movie key={index} movie={movie} i={index} />
        ))}
      </Grid>
    )
}

export default MovieList
