import { Button, Modal, Typography, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import genreIcons from '../../assets/genres'
import { useGetListQuery, useGetMovieQuery, useGetRecommendedQuery } from '../../services/TMDB'
import useStyles from './styles'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import MovieList from '../MovieList/MovieList'

function MovieInformation() {
  const { id } = useParams()
  const { user } = useSelector((state) => state.user)
  const { data, isFetching, error } = useGetMovieQuery(id)
  const { data: favoriteMovies, isFetching: isFavoriteFetching } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const { data: watchlistMovies, isFetching: isWatchlistFetching } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const { data: recommendations, isFetching: isRecommendedFetching } = useGetRecommendedQuery({ list: '/recommendations', movie_id: id })
  const classes = useStyles()
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);

  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [favoriteMovies, data])
  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [watchlistMovies, data])

  const addToFavourite = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    })

    setIsMovieFavorited((prev) => !prev)
  }
  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    })

    setIsMovieWatchlisted((prev) => !prev)
  }

  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory)

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    )
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">
          Something has gone wrong - Please go back
        </Link>
      </Box>
    )
  }

    return (
      <Grid container className={classes.containerSpaceAround}>
        <Grid item sm={12} lg={4} styles={{ display: 'flex', marginBottom: '30px' }}>
          <img src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} className={classes.poster} />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography variant="h3" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split('-')[0]})
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {data?.tagline}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Box display="flex" align="center">

              <Rating readOnly value={data.vote_average / 2} />
              <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
                {data?.vote_average} / 10
              </Typography>

            </Box>

            <Typography variant="h6" align="center" gutterBottom>
              {data?.runtime}min {`| Language: ${data?.spoken_languages[0]?.name}`}
            </Typography>
          </Grid>
          <Grid item className={classes.genresContainer}>
            {data?.genres?.map((genre, i) => (
              <Link key={i} className={classes.links} style={{ textDecoration: 'none' }} to="/" onClick={() => dispatch(selectGenreOrCategory(genre?.id))}>
                <img src={genreIcons[genre?.name?.toLowerCase()]} alt="logoooo" className={classes.genreImage} height={30} />
                <Typography color="textPrimary" variant="subtitle1" style={{ textDecoration: 'none' }}>
                  {genre?.name}
                </Typography>
              </Link>
          ))}
          </Grid>
          <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
            Overview
          </Typography>

          <Typography style={{ marginBottom: '2rem' }}>
            {data?.overview}
          </Typography>

          <Typography varaint="h5" gutterBottom>
            Top Cast
          </Typography>

          <Grid item container spacing={2}>
            {data && data.credits.cast.map((character, i) => (
              character.profile_path && (
              <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
                <img src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`} className={classes.castImage} alt={character?.name} />
                <Typography color="textPrimary">{character?.name}</Typography>
                <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
              </Grid>

              )
              )).slice(0, 6)}
          </Grid>
          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.buttonsContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="medium" varaint="outlined">
                  <Button target="_blank" rel="noopener norefferer" href={data?.homepage} endIcon={<Language />}>
                    Website
                  </Button>
                  <Button target="_blank" rel="noopener norefferer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                    IMDB
                  </Button>
                  <Button onClick={() => setOpen(true)} target="_blank" rel="noopener norefferer" endIcon={<Theaters />}>
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                <ButtonGroup size="medium" varaint="outlined">
                  <Button onClick={addToFavourite} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                    {isMovieFavorited ? 'UnFavourite' : 'Favourite'}
                  </Button>
                  <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                    Watchlist
                  </Button>
                  <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                    <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{ textDecoration: 'none' }}>
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>

        {/* Recommended */}
        <Box marginTop="5rem" width="100%">
          <Typography variant="h3" gutterBottom align="center">
            You might also like
          </Typography>
          {recommendations ? <MovieList movies={recommendations} numberOfMovies={12} /> : <Box>Sorry, nothing was found</Box>}
        </Box>
        <Modal closeAfterTransition className={classes.modal} open={open} onClose={() => setOpen(false)}>
          {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
            allow="autoplay"
          />
              )}
        </Modal>
      </Grid>
    )
}

export default MovieInformation
