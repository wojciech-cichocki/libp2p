import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '../../static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  status: {
    textAlign: 'center',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    minHeight: 50,
    color: colors.yellow.base
  }
}))

export default useStyles
