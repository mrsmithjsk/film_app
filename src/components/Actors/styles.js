import { makeStyles } from '@mui/styles';

const LINES_TO_SHOW = 10;

export default makeStyles((theme) => ({
   image: {
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 0.5em 1em',
   },

   poster: {
       borderRadius: '20px',
       boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
       width: '80%',
       [theme.breakpoints.down('md')]: {
        margin: '0 auto',
        width: '50%',
        height: '350px',
    },
       [theme.breakpoints.down('sm')]: {
        margin: '0 auto',
        width: '100%',
        height: '350px',
        marginBottom: '30px',
    },
   },
   genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
   },
   genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '0.5rem 1rem',
        },
    },
    castImage: {
        width: '100%',
        maxWidth: '7em',
        height: '8em',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: '50%',
        height: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            height: '90%',
        },
    },
    biography: {
        marginTop: '10px !important',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': LINES_TO_SHOW,
        '-webkit-box-orient': 'vertical',
    },
}));
