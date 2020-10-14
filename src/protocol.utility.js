const uint8arrayFromString = require('uint8arrays/from-string')
const uint8arrayToString = require('uint8arrays/to-string')

const {SeatsUpdate, Seat} = require('./protocol.model')

const encodeSeat = ({id, type, peerId, created}) => {
    return Seat.encode(seatToBytes(
        {
            id,
            type,
            peerId,
            created
        }
    ))
}

const encodeUpdateSeats = (firstSeat, secondSeat) => {
    return SeatsUpdate.encode({
        firstSeat: seatToBytes(firstSeat),
        secondSeat: seatToBytes(secondSeat)
    })
}

const decodeSeat = (encodedSeat) => {
    return seatFromBytes(Seat.decode(encodedSeat))
}

const decodeUpdateSeats = (encodedUpdateSeats) => {
    const decodeUpdateSeats = SeatsUpdate.decode(encodedUpdateSeats);

    return {
        firstSeat: seatFromBytes(decodeUpdateSeats.firstSeat),
        secondSeat: seatFromBytes(decodeUpdateSeats.secondSeat)
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
    encodeUpdateSeats,
    decodeSeat,
    decodeUpdateSeats
}