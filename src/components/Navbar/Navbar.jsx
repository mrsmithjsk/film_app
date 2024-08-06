import { Button, IconButton, Toolbar, Avatar, Drawer, AppBar, useMediaQuery } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { Sidebar, Search } from '..'
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { setUser, userSelector } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme()

  const colorMode = useContext(ColorModeContext)

  const dispatch = useDispatch()

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
          dispatch(setUser(userData))
        } else {
          const sessionId = await createSessionId()

          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`)

          dispatch(setUser(userData))
        }
      }
    }
    logInUser()
  }, [token])
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            {isMobile && (
              <IconButton color="inherit" edge="start" style={{ outline: 'none' }} onClick={() => setMobileOpen((prev) => !prev)} className={classes.menuButton}>
                <Menu />
              </IconButton>
            )}
            <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {!isMobile && <Search />}
            <div>
              {!isAuthenticated ? (
                <Button color="inherit" onClick={fetchToken}>
                  Login &nbsp; <AccountCircle />
                </Button>
                ) : (
                  <Button color="inherit" onClick={() => {}} component={Link} to={`/profile/${user.id}`} className={classes.linkButton}>
                    {!isMobile && <>My Movies &nbsp;</>}
                    <Avatar style={{ width: 30, height: 30 }} alt="profile" src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`} />
                  </Button>
                )}
            </div>
            {isMobile && <Search />}
          </Toolbar>
        </AppBar>

        <div>
          <nav className={classes.drawer}>
            {isMobile ? (
              <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={() => setMobileOpen((prev) => !prev)} classes={{ paper: classes.drawerPaper }} ModalProps={{ keepMounted: true }}>
                <Sidebar setMobileOpen={setMobileOpen} />
              </Drawer>

                  ) : (
                    <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                      <Sidebar setMobileOpen={setMobileOpen} />
                    </Drawer>
                  )}
          </nav>
        </div>
      </div>
    )
}

export default Navbar
