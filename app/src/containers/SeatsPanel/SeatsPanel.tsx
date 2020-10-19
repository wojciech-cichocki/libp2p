import React from "react";
import useStyles from "./style";
import {Grid} from "@material-ui/core";
import {SeatCard} from "../../components/SeatCard/SeatCard";


export const SeatsPanel: React.FC = () => {
    const classes = useStyles()

    return (
        <Grid justify="space-around" className={classes.root}>
            <Grid>
                <SeatCard taken={false} releasable={false} initialized={true}/>
            </Grid>
            <Grid>
                <SeatCard taken={false} releasable={false} initialized={true}/>
            </Grid>
        </Grid>
    )
}