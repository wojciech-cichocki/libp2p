import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../static/theme';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: 245,
    width: 300,
    padding: 20,
    backgroundColor: colors.blue.base,
    borderRadius: 10,
    fontWeight: 900,
    color: '#fff',
  },
});

export default useStyles;
