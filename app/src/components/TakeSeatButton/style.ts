import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  button: {
    color: '#FFF',
    backgroundColor: '#066',
    textTransform: 'lowercase',
    borderStyle: 'solid',
    borderColor: '#FFF',

    '&:hover': {
      backgroundColor: '#0aa'
    }
  }
}))

export default useStyles
