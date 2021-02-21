import { createSelector } from 'reselect';

import { ISeatCard } from '../../containers/SeatCard/SeatCard';
import { ApplicationState } from '../index';
import { SeatState } from '../types';
import { seatToSeatCard } from './helper';

const state = (app: ApplicationState): SeatState => app.seatState;

export const PeerIdSelector = createSelector(state, (seatState: SeatState):
  | string
  | undefined => {
  return seatState.peerId;
});

export const SignalingServerError = createSelector(
  state,
  (seatState: SeatState): boolean => {
    return seatState.signalingServerError;
  }
);

export const SeatCardSelector = createSelector(
  state,
  (seatState: SeatState): ISeatCard[] => {
    const seatCards: ISeatCard[] = [];
    seatCards.push(
      seatToSeatCard(seatState.init, seatState.peerId, seatState.firstSeat)
    );
    seatCards.push(
      seatToSeatCard(seatState.init, seatState.peerId, seatState.secondSeat)
    );

    return seatCards;
  }
);
