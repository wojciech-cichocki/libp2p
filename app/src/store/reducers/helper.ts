import { Seat, SeatRequest, SeatType } from '../types';

export const takeSeat = (seat: Seat, seatRequest: SeatRequest): Seat => {
  return {
    id: seat.id,
    peerId: seatRequest.from,
    type: SeatType.TAKEN,
    timestamp: seatRequest.timestamp,
  };
};

export const releaseSeat = (seat: Seat, seatRequest: SeatRequest): Seat => {
  return {
    id: seat.id,
    peerId: undefined,
    type: SeatType.FREE,
    timestamp: seatRequest.timestamp,
  };
};

export const checkSeatIsFree = (
  id: number,
  seat?: Seat | undefined
): boolean => {
  if (seat === undefined) {
    return true;
  }

  if (id !== seat?.id) {
    return false;
  }

  return seat.type === SeatType.FREE;
};

export const checkSeatIsTakenByPeer = (
  id: number,
  from: string,
  seat?: Seat
): boolean => {
  if (seat === undefined) {
    return true;
  }

  return seat.id === id && seat.type === SeatType.TAKEN && seat.peerId === from;
};

export const getLastTimestamp = (
  t1: number | undefined,
  t2: number | undefined
): number | undefined => {
  if (t1 === undefined && t2 === undefined) {
    return undefined;
  }

  if (t1 !== undefined && t2 === undefined) {
    return t1;
  }

  if (t1 === undefined && t2 !== undefined) {
    return t2;
  }

  return (t1 as number) >= (t2 as number) ? t1 : t2;
};
