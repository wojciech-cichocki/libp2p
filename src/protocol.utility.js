const uint8arrayFromString = require('uint8arrays/from-string')
const uint8arrayToString = require('uint8arrays/to-string')

const {CurrentState, Seat, TakeSeatRequest} = require('./protocol.model')

const encodeSeat = ({id, type, peerId, timestamp}) => {
    return Seat.encode(seatToBytes(
        {
            id,
            type,
            peerId,
            timestamp
        }
    ))
}

const decodeSeat = (encodedSeat) => {
    return seatFromBytes(Seat.decode(encodedSeat))
}

const encodeTakeSeatRequest = ({id, timestamp}) => {
    return TakeSeatRequest.encode({id, timestamp})
}

const decodeTakeSeatRequest = (encodedTakeSeatRequest) => {
    return TakeSeatRequest.decode(encodedTakeSeatRequest)
}

const encodeCurrentState = (firstSeat, secondSeat) => {
    return CurrentState.encode({
        firstSeat: seatToBytes(firstSeat),
        secondSeat: seatToBytes(secondSeat)
    })
}

const decodeCurrentState = (encodedCurrentState) => {
    const decodeCurrentState = CurrentState.decode(encodedCurrentState);

    return {
        firstSeat: seatFromBytes(decodeCurrentState.firstSeat),
        secondSeat: seatFromBytes(decodeCurrentState.secondSeat)
    }
}

const seatToBytes = (seat) => {
    return transformMsg(seat, uint8arrayFromString)
}

const seatFromBytes = (seat) => {
    return transformMsg(seat, uint8arrayToString)
}

const transformMsg = (seat, peerIdConverter) => {
    const output = Object.assign({}, seat);
    if (output.peerId) {
        return Object.assign(output, {peerId: peerIdConverter(output.peerId)})
    }
    delete output.peerId
    return output
}

module.exports = {
    encodeSeat,
    decodeSeat,
    encodeCurrentState,
    decodeCurrentState,
    encodeTakeSeatRequest,
    decodeTakeSeatRequest
}