const uint8arrayFromString = require('uint8arrays/from-string')
const uint8arrayToString = require('uint8arrays/to-string')

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
    seatToBytes,
    seatFromBytes
}