export interface Seat {
    id: number,
    type: SeatType,
    peerId?: string
    timestamp: number
}

export enum SeatType {
    FREE,
    TAKEN
}

export interface SeatState {
    firstSeat?: Seat,
    secondSeat?: Seat,
    peerId?: string
    init: boolean
}

export interface SeatRequest {
    id: number,
    timestamp: number,
}

export interface TakeSeatRequest extends SeatRequest {
}

export interface ReleaseSeatRequest extends SeatRequest {
}

