import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 245,
    width: 300,
    padding: 20,
    backgroundColor: '#044',
    // backgroundColor: colors.white.main,
    borderRadius: 10,
    fontWeight: 900,
    color: '#fff'
  },
  status: {
    textAlign: 'center',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    minHeight: 50
  }
}))

export default useStyles
