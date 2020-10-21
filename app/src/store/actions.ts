import {action} from 'typesafe-actions'
import {SeatAction, SeatState} from "./types";

export const initLibp2p = () => action(SeatAction.INIT_LIB_P2P)
export const requiresSynchronization = () => action(SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST)
export const currentStateResponse = (seatState: SeatState) => action(SeatAction.CURRENT_STATE_RESPONSE, seatState)