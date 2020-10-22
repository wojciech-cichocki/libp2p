import {Reducer} from 'redux'
import {SeatState} from "./types";
import {SeatAction} from "./actions";

const initialState: SeatState = {
    init: false
}

export const seatReducer: Reducer<SeatState> = (state = initialState, action) => {
    switch (action.type) {
        case SeatAction.SET_PEER_ID: {
            return {...state, peerId: action.payload}
        }
        case SeatAction.CURRENT_STATE_RESPONSE: {
            return {...state, ...action.payload, init: true}
        }
        default: {
            return state
        }
    }
}