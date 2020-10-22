import React from 'react'
import { Button, Grid } from '@material-ui/core'

import useStyles from './style'

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
  const getButtonName = (initialized: boolean, taken: boolean) => {
    return initialized ? (taken ? 'Release' : 'Take the seat') : 'wait'
  }

  return (
    <Grid className={classes.root}>
      <Button className={classes.button} onClick={onClick} disabled={disabled}>
        {getButtonName(initialized, taken)}
      </Button>
    </Grid>
  )
}

export default TakeSeatButton
