import {Reducer} from 'redux'
import {SeatAction, SeatState} from "./types";

const initialState: SeatState = {
    init: false
}

export const seatReducer: Reducer<SeatState> = (state = initialState, action) => {
    switch (action.type) {
        case SeatAction.CURRENT_STATE_RESPONSE: {
            // update based on timestamp
            console.log('[REDUCER] CURRENT STATE RESPONSE')
            // console.log(action.payload)
            // console.log(Object.assign({}, state, action.payload, {init: true}))
            // return Object.assign({}, state, action.payload, {init: true})
            return {
                ...state, init: true
            }
        }
        default: {
            return state
        }
    }
}