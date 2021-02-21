import { action } from 'typesafe-actions';

import { SeatRequest, SeatState } from './types';

export enum SeatAction {
  GET_LIB_P2P = 'GET_LIB_P2P',
  HANDLE_SIGNALING_SERVER_ERROR = 'HANDLE_SIGNALING_SERVER_ERROR',
  SET_PEER_ID = 'SET_PEER_ID',
  REQUIRES_SYNCHRONIZATION_REQUEST = 'REQUIRES_SYNCHRONIZATION_REQUEST',
  CURRENT_STATE_RESPONSE = 'CURRENT_STATE_RESPONSE',
  TAKE_SEAT_REQUEST = 'TAKE_SEAT_REQUEST',
  TAKE_SEAT_HANDLER = 'TAKE_SEAT_HANDLER',
  RELEASE_SEAT_REQUEST = 'RELEASE_SEAT_REQUEST',
  RELEASE_SEAT_HANDLER = 'RELEASE_SEAT_HANDLER',
}

export const getLibp2p = (): { type: SeatAction.GET_LIB_P2P } =>
  action(SeatAction.GET_LIB_P2P);

export const handleSignalingServerError = (): {
  type: SeatAction.HANDLE_SIGNALING_SERVER_ERROR;
} => action(SeatAction.HANDLE_SIGNALING_SERVER_ERROR);

export const setPeerId = (peerId: string): { type: SeatAction.SET_PEER_ID } =>
  action(SeatAction.SET_PEER_ID, peerId);

export const requiresSynchronization = (): {
  type: SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST;
} => action(SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST);

export const takeSeatRequest = (
  seatId: number
): { type: SeatAction.TAKE_SEAT_REQUEST } =>
  action(SeatAction.TAKE_SEAT_REQUEST, seatId);

export const releaseSeatRequest = (
  seatId: number
): { type: SeatAction.RELEASE_SEAT_REQUEST } =>
  action(SeatAction.RELEASE_SEAT_REQUEST, seatId);

export const currentStateResponse = (
  seatState: SeatState
): { type: SeatAction.CURRENT_STATE_RESPONSE } =>
  action(SeatAction.CURRENT_STATE_RESPONSE, seatState);

export const takeSeatResponse = (
  seatRequest: SeatRequest
): { type: SeatAction.TAKE_SEAT_HANDLER } =>
  action(SeatAction.TAKE_SEAT_HANDLER, seatRequest);

export const releaseSeatResponse = (
  seatRequest: SeatRequest
): { type: SeatAction.RELEASE_SEAT_HANDLER } =>
  action(SeatAction.RELEASE_SEAT_HANDLER, seatRequest);
