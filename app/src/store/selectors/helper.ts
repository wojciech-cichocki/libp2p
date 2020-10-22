import {ISeatCard} from "../../components/SeatCard/SeatCard";
import {Seat, SeatType} from "../types";

export const seatToSeatCard = (init: boolean, peerId?: string, seat?: Seat): ISeatCard => {
    const type: SeatType | undefined = seat?.type;

    return {
        id: seat?.id as number,
        peerId: seat?.peerId,
        taken: type === SeatType.TAKEN,
        releasable: peerId === seat?.peerId,
        initialized: init
    }
}