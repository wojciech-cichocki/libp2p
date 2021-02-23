import { Grid } from '@material-ui/core';
import React, { Fragment, ReactElement, ReactNode } from 'react';
import { ErrorCard } from '../../components/ErrorCard/ErrorCard';
import FullHeight from '../full-height/FullHeight';
import Catch from './ErrorBoundaryUtility';

interface Props {
  children: ReactNode;
}

const CriticalAppError = Catch(
  ({ children }: Props, error?: Error): ReactElement<any, any> => {
    if (error) {
      return (
        <FullHeight verticalAlign={true} horizontalAlign={true}>
          <Grid container={true} alignItems="center" justify="center">
            <ErrorCard
              title="An error has occurred in the application"
              message={error.message}
            />
          </Grid>
        </FullHeight>
      );
    } else {
      return <Fragment>{children}</Fragment>;
    }
  }
);

export default CriticalAppError;
