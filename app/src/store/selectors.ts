import {ApplicationState} from "./index";
import {createSelector} from 'reselect'


const state = (state: ApplicationState) => state.seatState

export const TestingSelector = createSelector(state, state => state)