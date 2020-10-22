import {createSelector} from 'reselect'

import {ApplicationState} from "../index";
import {SeatState} from "../types";
import {ISeatCard} from "../../components/SeatCard/SeatCard";
import {seatToSeatCard} from "./helper";


const state = (state: ApplicationState): SeatState => state.seatState

export const PeerIdSelector = createSelector(state, (seatState) => {
    return seatState.peerId
})

export const SeatCardSelector = createSelector(state,  (seatState) => {
    const seatCards: ISeatCard[] = []
    seatCards.push(seatToSeatCard(seatState.init, seatState.peerId, seatState.firstSeat))
    seatCards.push(seatToSeatCard(seatState.init, seatState.peerId, seatState.secondSeat))

    return seatCards
})