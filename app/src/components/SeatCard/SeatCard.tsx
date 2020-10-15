import React from 'react'
import useStyles from './style'
import { Grid } from '@material-ui/core'
import { SeatStatus } from '../SeatStatus/SeatStatus'

export interface ISeatCard {
  taken: boolean
  releasable: boolean
  peerId?: string
  initialized: boolean
}

export const SeatCard: React.FC<ISeatCard> = ({ taken, releasable, peerId, initialized }) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} direction={'column'} justify={'space-between'}>
      <SeatStatus taken={taken} initialized={initialized} peerId={peerId} />
    </Grid>
  )
}
