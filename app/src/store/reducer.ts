import {Reducer} from 'redux'
import {SeatAction, SeatState} from "./types";

const initialState: SeatState = {
    init: false
}

export const seatReducer: Reducer<SeatState> = (state = initialState, action) => {
    switch (action.type) {
        case SeatAction.CURRENT_STATE_RESPONSE: {

        }
        default: {
            return state
        }
    }
}