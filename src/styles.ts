import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  '@global': {
    body: {
      fontFamily: 'sans-serif',
      fontSize: 13,
      color: '#333',
    },
    '.CodeMirror': { height: '100%' },
  },
  root: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  leftSide: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
  editor: {
    flexGrow: 1,
  },
  output: {
    width: '50%',
  },
});
