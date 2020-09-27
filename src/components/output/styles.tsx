import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    position: 'relative',
    padding: 15,
  },
  pre: {
    margin: 0,
    fontFamily: 'monospace',

    '& .error': { color: "#f00" },
  },
});
