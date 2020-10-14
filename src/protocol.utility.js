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

const decodeSeat = (encodedSeat) => {
    return seatFromBytes(Seat.decode(encodedSeat))
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
}