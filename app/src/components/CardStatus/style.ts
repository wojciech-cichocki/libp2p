import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  status: {
    textAlign: 'center',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    minHeight: 50
  }
}))

export default useStyles
