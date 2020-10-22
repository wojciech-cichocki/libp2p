import { makeStyles, Theme } from '@material-ui/core/styles'

import { colors } from '../../static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  status: {
    textAlign: 'center',
    borderStyle: 'solid',
    padding: 10,
    borderWidth: 2,
    minHeight: 50,
    color: colors.yellow.base
  },
  skeletonStatus: {
    padding: 10,
    borderWidth: 2,
    minHeight: 50,
    backgroundColor: colors.yellow.base
  }
}))

export default useStyles
