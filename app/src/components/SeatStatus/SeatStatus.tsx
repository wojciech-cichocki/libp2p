import { Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

import useStyles from './style';

export interface ISeatStatus {
  taken: boolean;
  peerId?: string;
  initialized: boolean;
}

export const SeatStatus: React.FC<ISeatStatus> = ({
  taken,
  peerId,
  initialized,
}: ISeatStatus): ReactElement<ISeatStatus, any> => {
  const classes = useStyles();

  const shortenPeerId = (id: string, last: number): string => {
    const prefix = id.substr(0, last);
    const suffix = id.substr(id.length - last);

    return prefix.concat('...').concat(suffix);
  };

  const getStatusBox = (
    isTaken: boolean,
    id?: string
  ): ReactElement<any, any> => {
    return isTaken && id ? (
      <>
        <Typography>Seats is taken by:</Typography>
        <Typography>{shortenPeerId(id, 10)}</Typography>
      </>
    ) : (
      <Typography>Seat is free</Typography>
    );
  };

  return (
    <Grid className={initialized ? classes.status : classes.skeletonStatus}>
      {initialized ? getStatusBox(taken, peerId) : <></>}
    </Grid>
  );
};
