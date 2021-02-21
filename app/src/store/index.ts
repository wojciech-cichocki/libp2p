import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { seatReducer } from './reducers/reducer';
import { seatSaga } from './sagas';
import { SeatState } from './types';

export interface ApplicationState {
  seatState: SeatState;
}

export const rootReducer = combineReducers<ApplicationState>({
  seatState: seatReducer,
});

export function* rootSaga(): Generator<any> {
  yield all([fork(seatSaga)]);
}
