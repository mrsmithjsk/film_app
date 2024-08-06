import React, { useEffect, useContext } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { fetchToken } from '../utils';
import { searchMovie, selectGenreOrCategory } from '../features/currentGenreOrCategory';

function useAlan() {
    const { setMode } = useContext(ColorModeContext);
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        alanBtn({
            key: '58b2900ffee9162dde1045f5cbea398b2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
              if (command === 'changeMode') {
                  if (mode === 'light') {
                      setMode('light')
                } else {
                      setMode('dark')
                  }
              } else if (command === 'login') {
                fetchToken()
              } else if (command === 'logout') {
                localStorage.clear();

                window.location.href = '/';
              } else if (command === 'chooseGenre') {
                  const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase())

                  if (foundGenre) {
                      history.push('/');
                        dispatch(selectGenreOrCategory(foundGenre.id))
                  } else {
                      const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory
                      history.push('/');
                      dispatch(selectGenreOrCategory(category))
                  }
              } else if (command === 'search') {
                  dispatch(searchMovie(query))
              }
            },
        });
      }, []);
    return (
      <div>
        alan
      </div>
    )
}

export default useAlan
