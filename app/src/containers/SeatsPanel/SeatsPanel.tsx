import React from "react";
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";

import useStyles from "./style";
import {ISeatCard, SeatCard} from "../../components/SeatCard/SeatCard";
import {SeatCardSelector} from "../../store/selectors/selectors";

export const SeatsPanel: React.FC = () => {
    const classes = useStyles()
    const seatsCards: ISeatCard[] = useSelector(SeatCardSelector);


    return (
        <Grid container justify="space-around" className={classes.root}>
            <Grid>
                <SeatCard id={seatsCards[0].id}
                          taken={seatsCards[0].taken}
                          peerId={seatsCards[0].peerId}
                          releasable={seatsCards[0].releasable}
                          initialized={seatsCards[0].initialized}/>
            </Grid>
            <Grid>
                <SeatCard id={seatsCards[1].id}
                          taken={seatsCards[1].taken}
                          peerId={seatsCards[1].peerId}
                          releasable={seatsCards[1].releasable}
                          initialized={seatsCards[1].initialized}/>
            </Grid>
        </Grid>
    )
}