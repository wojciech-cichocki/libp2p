import React from 'react'
import useStyles from './style'
import { Button, Checkbox, Grid } from '@material-ui/core'

export const MainPage: React.FC = () => {
  const classes = useStyles()

  return <Grid className={classes.root}></Grid>
}
