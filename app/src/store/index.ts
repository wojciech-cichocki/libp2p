import {combineReducers, Dispatch, Reducer, Action, AnyAction} from 'redux'
import {all, fork} from 'redux-saga/effects'
import {SeatState} from "./types";
import {seatReducer} from "./reducer";
import {seatSaga} from "./sagas";

export interface ApplicationState {
    seatState: SeatState
}

export const rootReducer = combineReducers<ApplicationState>({
    seatState: seatReducer
})

export function* rootSaga() {
    yield all([
        fork(seatSaga)
    ])
}