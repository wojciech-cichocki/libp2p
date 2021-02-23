import { Grid } from '@material-ui/core';
import React, { ReactElement } from 'react';

import useStyles from './style';

export interface IErrorCard {
  title: string;
  message: string;
}

export const ErrorCard: React.FC<IErrorCard> = ({
  title,
  message,
}: IErrorCard): ReactElement<IErrorCard, any> => {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <h2>{title}</h2>
      <h4>{message}</h4>
    </Grid>
  );
};
