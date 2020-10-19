import React from 'react'
import {Grid} from '@material-ui/core'
import {SeatsPanel} from "../SeatsPanel/SeatsPanel";
import useStyles from "./style";

export const MainPage: React.FC = () => {
    const classes = useStyles()

    return (
        <Grid justify="center" alignItems="center" className={classes.root}>
            <SeatsPanel/>
        </Grid>
    )
}
