import {Reducer} from 'redux'
import {Seat, SeatState} from "../types";
import {SeatAction} from "../actions";
import {checkSeatIsFree, checkSeatIsTakenByPeer, getLastTimestamp, releaseSeat, takeSeat} from "./helper";

const initialState: SeatState = {
    init: false
}

export const seatReducer: Reducer<SeatState> = (state = initialState, action) => {
    switch (action.type) {
        case SeatAction.SET_PEER_ID: {
            return {...state, peerId: action.payload}
        }
        case SeatAction.CURRENT_STATE_RESPONSE: {
            const {firstSeat, secondSeat} = action.payload
            const currentTimestamp = getLastTimestamp(state.firstSeat?.timestamp, state.secondSeat?.timestamp);
            const proposalTimestamp = getLastTimestamp(firstSeat?.timestamp, secondSeat?.timestamp)

            if (currentTimestamp === undefined) {
                return {...state, ...action.payload, init: true}
            }

            if (proposalTimestamp !== undefined && proposalTimestamp > (currentTimestamp as number)) {
                return {...state, ...action.payload, init: true}
            }

            return state
        }
        case SeatAction.TAKE_SEAT_HANDLER: {
            const {id} = action.payload

            if (checkSeatIsFree(id, state.firstSeat)) {
                const newSeat = takeSeat(state.firstSeat as Seat, action.payload);
                return {...state, firstSeat: newSeat}
            }

            if (checkSeatIsFree(id, state.secondSeat)) {
                const newSeat = takeSeat(state.secondSeat as Seat, action.payload);
                return {...state, secondSeat: newSeat}
            }
            return state
        }
        case SeatAction.RELEASE_SEAT_HANDLER: {
            console.log('[RELEASE_SEAT_HANDLER]')
            const {id, from} = action.payload

            if (checkSeatIsTakenByPeer(id, from, state.firstSeat)) {
                const newSeat = releaseSeat(state.firstSeat as Seat, action.payload);
                return {...state, firstSeat: newSeat}
            }

            if (checkSeatIsTakenByPeer(id, from, state.secondSeat)) {
                const newSeat = releaseSeat(state.secondSeat as Seat, action.payload);
                return {...state, secondSeat: newSeat}
            }
            return state
        }

        default: {
            return state
        }
    }
}