import {Reducer} from 'redux'
import {Seat, SeatState} from "../types";
import {SeatAction} from "../actions";
import {checkSeatIsFree, getLastTimestamp, takeSeat} from "./helper";

const initialState: SeatState = {
    init: false
}

export const seatReducer: Reducer<SeatState> = (state = initialState, action) => {
    switch (action.type) {
        case SeatAction.SET_PEER_ID: {
            return {...state, peerId: action.payload}
        }
        case SeatAction.CURRENT_STATE_RESPONSE: {
            //TODO: need update, to async need choose the last timestamp

            // const lastTimestamp = getLastTimestamp(state.firstSeat?.timestamp, state.secondSeat?.timestamp);
            return {...state, ...action.payload, init: true}
        }
        case SeatAction.TAKE_SEAT_HANDLER: {
            const {id} = action.payload

            if (checkSeatIsFree(id, state.firstSeat)) {
                const newSeat = takeSeat(state.firstSeat as Seat, action.payload);
                return {...state, firstSeat: newSeat}
            }

            if(checkSeatIsFree(id, state.secondSeat)) {
                const newSeat = takeSeat(state.secondSeat as Seat, action.payload);
                return {...state, secondSeat: newSeat}
            }
        }
        default: {
            return state
        }
    }
}