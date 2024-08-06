import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

function Profile() {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { data: favoriteMovies, isFetching: isFavoriteFetching, refetch: refetchFavorite } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })
  const { data: watchlistMovies, isFetching: isWatchlistFetching, refetch: refetchWatchlist } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 })

  useEffect(() => {
    refetchFavorite()

    refetchWatchlist()
  }, [])

  const favouriteMovies = [];

  const logout = () => {
    localStorage.clear();

    window.location.href = '/';
  }

    return (
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>My Profile</Typography>
          <Button onClick={logout} color="inherit">
            Logout &nbsp; <ExitToApp />
          </Button>
        </Box>
        {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
          <Typography variant="h5">Add favourites or watch them later</Typography>
        ) : (
          <Box>
            <RatedCards title="Favourite Movies" data={favoriteMovies} />
            <RatedCards title="Watchlist" data={watchlistMovies} />
          </Box>
        )}
      </Box>
    )
}

export default Profile
