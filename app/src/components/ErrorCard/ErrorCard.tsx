import {Grid} from "@material-ui/core";
import React from "react";

import useStyles from './style'

export interface IErrorCard {
    title: string,
    message: string
}

export const ErrorCard: React.FC<IErrorCard> = ({title, message}) => {
    const classes = useStyles();

    return (
        <Grid className={classes.root}>
            <h2>{title}</h2>
            <h4>{message}</h4>
        </Grid>
    )
}