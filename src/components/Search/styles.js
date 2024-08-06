import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    searchContainer: {
        width: '800px',
        [theme.breakpoints.down('lg')]: {
            display: 'flex',
            justifyContent: 'center',
            width: '400px',
        },
        [theme.breakpoints.down('lg')]: {
            display: 'flex',
            justifyContent: 'center',
            width: '250px',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        },
    },
    input: {
        color: theme.palette.mode === 'light' && 'black',
        filter: theme.palette.mode === 'light' && 'invert(1)',
        width: '750px',
        [theme.breakpoints.down('lg')]: {
            width: '400px',
        },
        [theme.breakpoints.down('md')]: {
            width: '250px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '-10px',
            marginBottom: '10px',
        },
    },
    xIcon: {
        cursor: 'pointer',
    },
}));
