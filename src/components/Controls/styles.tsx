import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    background: '#323f4f',
    height: 48,
    boxSizing: 'border-box',
    padding: 7,
    borderBottom: '1px #172329 solid',
    display: 'flex',
  },
  button: {
    background: '#fff',
    width: 32,
    height: 32,
    color: 'rgb(49 78 125)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    boxShadow: '1px 1px 3px rgba(0, 0, 0, .05)',

    '&:hover': {
      boxShadow: '2px 2px 2px rgba(0, 0, 0, .1)',
      color: '#000',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
  select: {
    background: '#fff',
    height: 32,
    lineHeight: '32px',
    whiteSpace: 'nowrap',
    color: 'rgb(49 78 125)',
    cursor: 'pointer',
    marginRight: 7,
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',
    position: 'relative',
    borderRadius: 2,

    '& .selval': {
      flexGrow: 1,
    },
    '& ul': {
      position: 'absolute',
      zIndex: 100,
      left: 0,
      top: '100%',
      right: 0,
      background: '#efefef',
      listStyle: 'none',
      margin: 0,
      padding: 0,

      '& li': {
        padding: '0 5px',
        borderBottom: '1px #ddd solid',

        '&:hover': {
          background: '#fff',
        },
      },
    },
  },
});
