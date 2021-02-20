
import React, { Fragment, ReactElement, ReactNode } from 'react';
import Catch from './ErrorBoundaryUtility';

interface Props {
    children: ReactNode;
}

const CriticalAppError = Catch(
    ({ children }: Props, error?: Error): ReactElement<any, any> => {
        if (error) {
            return (
                <div>
                    <h2>An error has occurred</h2>
                    <h4>{error.message}</h4>
                </div>
            );
        } else {
            return <Fragment>{children}</Fragment>;
        }
    }
);

export default CriticalAppError;