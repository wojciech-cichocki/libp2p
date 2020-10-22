import {action} from 'typesafe-actions'
import {SeatState} from "./types";

export enum SeatAction {
    INIT_LIB_P2P = "INIT_LIB_P2P",
    SET_PEER_ID = "SET_PEER_ID",
    REQUIRES_SYNCHRONIZATION_REQUEST = "REQUIRES_SYNCHRONIZATION_REQUEST",
    CURRENT_STATE_RESPONSE = "CURRENT_STATE_RESPONSE",
    TAKE_SEAT_REQUEST = "TAKE_SEAT_REQUEST",
    TAKE_SEAT_HANDLER = "TAKE_SEAT_HANDLER",
    RELEASE_SEAT_REQUEST = "RELEASE_SEAT_REQUEST",
    RELEASE_SEAT_HANDLER = "RELEASE_SEAT_HANDLER"
}

export const initLibp2p = () => action(SeatAction.INIT_LIB_P2P)
export const setPeerId = (peerId: string) => action(SeatAction.SET_PEER_ID, peerId)
export const requiresSynchronization = () => action(SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST)
export const currentStateResponse = (seatState: SeatState) => action(SeatAction.CURRENT_STATE_RESPONSE, seatState)