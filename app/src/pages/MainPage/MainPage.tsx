import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { SeatsPanel } from '../../containers/SeatsPanel/SeatsPanel';
import useStyles from './style';

export const MainPage: React.FC = (): ReactElement<void, any> => {
  const classes = useStyles();

  return (
    <Grid
      container={true}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <SeatsPanel />
    </Grid>
  );
};
