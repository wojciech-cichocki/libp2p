import React from "react";
import useStyles from "./style";
import {Grid} from "@material-ui/core";
import {ISeatCard, SeatCard} from "../../components/SeatCard/SeatCard";
import {useSelector} from "react-redux";
import {SeatCardSelector} from "../../store/selectors/selectors";

export const SeatsPanel: React.FC = () => {
    const classes = useStyles()
    const seatsCards: ISeatCard[] = useSelector(SeatCardSelector);


    return (
        <Grid justify="space-around" className={classes.root}>
            <Grid>
                <SeatCard taken={seatsCards[0].taken} releasable={seatsCards[0].releasable}
                          initialized={seatsCards[0].initialized}/>
            </Grid>
            <Grid>
                <SeatCard taken={seatsCards[1].taken} releasable={seatsCards[1].releasable}
                          initialized={seatsCards[1].initialized}/>
            </Grid>
        </Grid>
    )
}