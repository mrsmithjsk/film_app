
import React, { useState } from 'react';
import { Divider, Grid, Typography, Box, CircularProgress, Button } from '@mui/material';
import { Link, useHistory, useParams } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { useGetActorQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

function Actors() {
  const { id } = useParams()
  const history = useHistory()
  const classes = useStyles()
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorQuery(id)
  const { data: actorsMovies, isFetching: actorsFetching } = useGetMoviesByActorIdQuery({ id, page })

  console.log('actorsMovies', actorsMovies)

  console.log('data', data)

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    )
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {/* <Link to="/">
          Something has gone wrong - Please go back
        </Link> */}
        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
          Go Back
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`} alt={data?.title} className={classes.image} />
        </Grid>
        {/* <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.name}
        </Typography>
        <Divider styles={{ marginBottom: '10px' }} />
        <Typography variant="h5" align="center" gutterBottom styles={{ marginTop: '10px' }} className={classes.biography}>
          {data?.biography}
        </Typography>
      </Grid> */}
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.biography}>
            {data?.biography || 'Sorry, no biography available'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} variant="outlined" color="primary" target="_blank">
              Go Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {actorsMovies && <MovieList movies={actorsMovies} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={actorsMovies?.total_pages} />
      </Box>
    </>
  );
}

export default Actors;
