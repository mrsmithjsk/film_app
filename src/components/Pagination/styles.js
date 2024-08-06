import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
   container: {
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
   },
   button: {
       margin: '10px !important',
   },
   pageNumber: {
    margin: '0 20px !important',
    color: theme.palette.text.primary,
   },
}));
