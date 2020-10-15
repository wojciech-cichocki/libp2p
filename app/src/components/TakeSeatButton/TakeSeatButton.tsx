import React from 'react'
import useStyles from './style'
import { Button, Grid } from '@material-ui/core'

export interface ISeatStatus {
  taken: boolean
  releasable?: boolean
  onClick: () => void
  initialized: boolean
}

export const TakeSeatButton: React.FC<ISeatStatus> = ({
  releasable,
  taken,
  onClick,
  initialized
}) => {
  const classes = useStyles()

  const disabled = !initialized || (taken && !releasable)

  return (
    <Grid className={classes.root}>
      <Button className={classes.button} onClick={onClick} disabled={disabled}>
        {initialized ? (taken ? 'Release' : 'Take the seat') : 'wait'}
      </Button>
    </Grid>
  )
}

export default TakeSeatButton
