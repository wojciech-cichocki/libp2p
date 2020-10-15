import { createMuiTheme } from '@material-ui/core/styles'

export const colors = {
  blue: {
    base: '#132743',
    light: '#2462b8'
  },
  red: {
    base: '#d7385e',
    light: '#ff4e78'
  },
  yellow: {
    base: '#edc988',
    light: '#f8efd4'
  },
  gray: {
    base: '#dcdcdc'
  },
  white: {
    main: '#FFFFFF'
  }
}
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue.base,
      contrastText: colors.red.base
    },
    secondary: {
      main: colors.yellow.base
    },
    text: {
      primary: colors.white.main,
      secondary: colors.blue.light
    }
  },
  typography: {
    fontFamily: 'Roboto',
    body1: {
      fontSize: 22,
      lineHeight: '40px'
    },
    body2: {
      fontSize: 16
    },
    h1: {
      fontSize: 56
    },
    h2: {
      fontSize: 40
    },
    h3: {
      fontSize: 32
    }
  }
})
