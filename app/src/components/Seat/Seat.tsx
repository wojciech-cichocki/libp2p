import React from 'react'
import useStyles from './style'

export interface ISeat {
  free: boolean
  releasable: boolean
  peerId?: string
}

export const Seat: React.FC<ISeat> = ({ free, releasable, peerId }) => {
  const classes = useStyles()
  return <div>TODO</div>
}
