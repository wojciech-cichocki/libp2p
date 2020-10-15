import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './static/theme'
import { MainPage } from './containers/MainPage/MainPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage></MainPage>
    </ThemeProvider>
  )
}

export default App
