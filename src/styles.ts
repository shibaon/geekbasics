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
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flexShrink: 0,
  },
  editor: {
    flexGrow: 1,
  },
  output: {
    flexShrink: 1,
    flexGrow: 1,
  },
  gripper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 10,
    cursor: 'ew-resize',
    zIndex: 10,

    '&:hover': {
      background: 'rgba(255, 255, 255, .1)',
    },
  },
});
