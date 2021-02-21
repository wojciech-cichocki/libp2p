import {Grid} from "@material-ui/core";
import React from "react";

import useStyles from './style'
import FullHeight from "../../wrappers/full-height/FullHeight";

export interface IErrorCard {
    title: string,
    message: string
}

export const ErrorCard: React.FC<IErrorCard> = ({title, message}) => {
    const classes = useStyles();

    return (
        <FullHeight verticalAlign={true} horizontalAlign={true}>
            <Grid container alignItems="center" justify="center">
                <Grid className={classes.root}>
                    <h2>{title}</h2>
                    <h4>{message}</h4>
                </Grid>
            </Grid>
        </FullHeight>
    )
}