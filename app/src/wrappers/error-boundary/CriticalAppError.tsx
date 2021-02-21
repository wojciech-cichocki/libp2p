import React, {Fragment, ReactElement, ReactNode} from 'react';
import Catch from './ErrorBoundaryUtility';
import {ErrorCard} from "../../components/ErrorCard/ErrorCard";

interface Props {
    children: ReactNode;
}

const CriticalAppError = Catch(
    ({children}: Props, error?: Error): ReactElement<any, any> => {
        if (error) {
            return (
                <ErrorCard title="An error has occurred in the application" message={error.message}/>
            )
        } else {
            return <Fragment>{children}</Fragment>;
        }
    }
);

export default CriticalAppError;