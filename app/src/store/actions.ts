import {action} from 'typesafe-actions'
import {SeatAction} from "./types";

export const initLibp2p = () => action(SeatAction.INIT_LIB_P2P)
export const requiresSynchronization = () => action(SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST)