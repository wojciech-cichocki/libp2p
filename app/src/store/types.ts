export enum SeatType {
    FREE,
    TAKEN
}

export interface Seat {
    id: number,
    type: SeatType,
    peerId?: string
    timestamp: number
}

export interface SeatRequest {
    seatId: number,
    peerId: string
    timestamp: number,
}

export interface TakeSeatRequest extends SeatRequest {
}

export interface ReleaseSeatRequest extends SeatRequest {
}

export enum SeatAction {
    INIT_LIB_P2P = "INIT_LIB_P2P",
    REQUIRES_SYNCHRONIZATION_REQUEST = "REQUIRES_SYNCHRONIZATION_REQUEST",
    CURRENT_STATE_RESPONSE = "CURRENT_STATE_RESPONSE",
    TAKE_SEAT_REQUEST = "TAKE_SEAT_REQUEST",
    TAKE_SEAT_HANDLER = "TAKE_SEAT_HANDLER",
    RELEASE_SEAT_REQUEST = "RELEASE_SEAT_REQUEST",
    RELEASE_SEAT_HANDLER = "RELEASE_SEAT_HANDLER"
}

export interface SeatState {
    firstSeat?: Seat,
    secondSeat?: Seat,
    init: boolean
}