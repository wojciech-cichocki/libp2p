import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { SeatStatus } from '../../components/SeatStatus/SeatStatus';
import TakeSeatButton from '../../components/TakeSeatButton/TakeSeatButton';
import { releaseSeatRequest, takeSeatRequest } from '../../store/actions';
import useStyles from './style';

export interface ISeatCard {
  id: number;
  taken: boolean;
  releasable: boolean;
  peerId?: string;
  initialized: boolean;
}

export const SeatCard: React.FC<ISeatCard> = ({
  id,
  taken,
  releasable,
  peerId,
  initialized,
}: ISeatCard): ReactElement<ISeatCard, any> => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Grid
      container={true}
      className={classes.root}
      direction={'column'}
      justify={'space-between'}
    >
      <SeatStatus taken={taken} peerId={peerId} initialized={initialized} />
      <TakeSeatButton
        taken={taken}
        releasable={releasable}
        onClick={(): void => {
          if (releasable) {
            dispatch(releaseSeatRequest(id));
          } else {
            dispatch(takeSeatRequest(id));
          }
        }}
        initialized={initialized}
      />
    </Grid>
  );
};
