import { Button, Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';

import useStyles from './style';

export interface ITakeSeatButton {
  taken: boolean;
  releasable?: boolean;
  onClick: () => void;
  initialized: boolean;
}

export const TakeSeatButton: React.FC<ITakeSeatButton> = ({
  releasable,
  taken,
  onClick,
  initialized,
}: ITakeSeatButton): ReactElement<ITakeSeatButton, any> => {
  const classes = useStyles();

  const disabled = !initialized || (taken && !releasable);
  const getButtonName = (isInitialized: boolean, isTaken: boolean): string => {
    return isInitialized ? (isTaken ? 'Release' : 'Take the seat') : 'wait';
  };

  return (
    <Grid className={classes.root}>
      <Button className={classes.button} onClick={onClick} disabled={disabled}>
        {getButtonName(initialized, taken)}
      </Button>
    </Grid>
  );
};

export default TakeSeatButton;
