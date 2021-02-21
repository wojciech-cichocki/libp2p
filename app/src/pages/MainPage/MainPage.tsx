import React from 'react'
import {Grid} from '@material-ui/core'

import useStyles from "./style";
import {SeatsPanel} from "../../containers/SeatsPanel/SeatsPanel";

export const MainPage: React.FC = () => {
    const classes = useStyles()

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <SeatsPanel/>
        </Grid>
    )
}
