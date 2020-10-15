import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '../../static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  button: {
    width: '100%',
    backgroundColor: colors.red.base,
    textTransform: 'lowercase',
    borderStyle: 'solid',
    color: colors.white.main,

    '&:hover': {
      backgroundColor: colors.red.light
    },
    '&:disabled': {
      backgroundColor: colors.gray.base
    }
  }
}))

export default useStyles
