import React from 'react'
import useStyles from './style'
import {Grid} from '@material-ui/core'
import {SeatStatus} from '../SeatStatus/SeatStatus'
import TakeSeatButton from '../TakeSeatButton/TakeSeatButton'
import {useDispatch} from "react-redux";
import {releaseSeatRequest, takeSeatRequest} from "../../store/actions";

export interface ISeatCard {
    id: number,
    taken: boolean
    releasable: boolean
    peerId?: string
    initialized: boolean
}

export const SeatCard: React.FC<ISeatCard> = ({id, taken, releasable, peerId, initialized}) => {
    const dispatch = useDispatch();
    const classes = useStyles()

    return (
        <Grid className={classes.root} direction={'column'} justify={'space-between'}>
            <SeatStatus taken={taken} peerId={peerId} initialized={initialized}/>
            <TakeSeatButton
                taken={taken}
                releasable={releasable}
                onClick={() => {
                    if (releasable) {
                        dispatch(releaseSeatRequest(id))
                    } else {
                        dispatch(takeSeatRequest(id))
                    }
                }}
                initialized={initialized}
            />
        </Grid>
    )
}
