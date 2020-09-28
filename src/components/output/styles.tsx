import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  textView: {
    boxSizing: 'border-box',
    position: 'relative',
    padding: 15,
    overflowY: 'auto',
  },
  pre: {
    margin: 0,
    fontFamily: 'monospace',

    '& .error': { color: "#f00" },
  },
  canvasLayout: {
    display: 'flex',
    flexDirection: 'column',
  },
  canvasWrapper: {
    flexGrow: 1,
    borderBottom: '2px #263238 solid',
  },
  canvas: {
    height: '100%',
    width: '100%',
  },
  canvasLayoutTextView: {
    height: 200,
  },
});
