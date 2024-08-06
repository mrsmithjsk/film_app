
import { TextField, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Search as SearchIcons } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import useStyles from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory'

function Search() {
    const classes = useStyles()
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            dispatch(searchMovie(query))
        }
    }
    const clear = () => {
        setQuery('')
    }

    if (location.pathname !== '/') return null;

    return (
      <div className={classes.searchContainer}>
        <TextField
          onKeyPress={handleKeyPress}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="standard"
          InputProps={{
            className: classes.input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcons />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start" className={classes.xIcon}>
                <ClearIcon onClick={clear} />
              </InputAdornment>
            ),
        }}
        />
      </div>
    )
}

export default Search
