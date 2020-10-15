import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'

export interface ISeatStatus {
  taken: boolean
  peerId?: string
  initialized: boolean
}

export const SeatStatus: React.FC<ISeatStatus> = ({ taken, peerId, initialized }) => {
  const classes = useStyles()

  const shortenPeerId = (peerId: string, last: number) => {
    const prefix = peerId.substr(0, last)
    const suffix = peerId.substr(peerId.length - last)

    return prefix.concat('...').concat(suffix)
  }

  return (
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
  )
}
