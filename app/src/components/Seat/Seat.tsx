import React from 'react'
import useStyles from './style'
import { Button, Grid, Typography } from '@material-ui/core'

export interface ISeat {
  taken: boolean
  releasable: boolean
  peerId?: string
  initialized: boolean
}

export const Seat: React.FC<ISeat> = ({ taken, releasable, peerId }) => {
  const classes = useStyles()

  const shortenPeerId = (peerId: string, last: number) => {
    const prefix = peerId.substr(0, last)
    const suffix = peerId.substr(peerId.length - last)

    return prefix.concat('...').concat(suffix)
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.status}>
        {taken && peerId ? (
          <>
            <Typography>Seats is taken by:</Typography>
            <Typography>{shortenPeerId(peerId, 10)}</Typography>
          </>
        ) : (
          <Typography>Seat is free</Typography>
        )}
      </Grid>
    </Grid>
  )
}
