import {action} from 'typesafe-actions'

import {SeatRequest, SeatState} from "./types";

export enum SeatAction {
    GET_LIB_P2P = "GET_LIB_P2P",
    HANDLE_SIGNALING_SERVER_ERROR = "HANDLE_SIGNALING_SERVER_ERROR",
    SET_PEER_ID = "SET_PEER_ID",
    REQUIRES_SYNCHRONIZATION_REQUEST = "REQUIRES_SYNCHRONIZATION_REQUEST",
    CURRENT_STATE_RESPONSE = "CURRENT_STATE_RESPONSE",
    TAKE_SEAT_REQUEST = "TAKE_SEAT_REQUEST",
    TAKE_SEAT_HANDLER = "TAKE_SEAT_HANDLER",
    RELEASE_SEAT_REQUEST = "RELEASE_SEAT_REQUEST",
    RELEASE_SEAT_HANDLER = "RELEASE_SEAT_HANDLER"
}

export const getLibp2p = () => action(SeatAction.GET_LIB_P2P)
export const handleSignalingServerError = () => action(SeatAction.HANDLE_SIGNALING_SERVER_ERROR)
export const setPeerId = (peerId: string) => action(SeatAction.SET_PEER_ID, peerId)
export const requiresSynchronization = () => action(SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST)
export const takeSeatRequest = (seatId: number) => action(SeatAction.TAKE_SEAT_REQUEST, seatId)
export const releaseSeatRequest = (seatId: number) => action(SeatAction.RELEASE_SEAT_REQUEST, seatId)

export const currentStateResponse = (seatState: SeatState) => action(SeatAction.CURRENT_STATE_RESPONSE, seatState)
export const takeSeatResponse = (seatRequest: SeatRequest) => action(SeatAction.TAKE_SEAT_HANDLER, seatRequest)
export const releaseSeatResponse = (seatRequest: SeatRequest) => action(SeatAction.RELEASE_SEAT_HANDLER, seatRequest)