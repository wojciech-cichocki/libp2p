import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
    '&>*': {
      height: '100%',
    },
  },
  verticalAlign: {
    '&>*': {
      verticalAlign: 'middle',
    },
  },
  horizontalAlign: {
    margin: 'auto',
  },
});

export default useStyles;
