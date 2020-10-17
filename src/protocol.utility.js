const uint8arrayFromString = require('uint8arrays/from-string')
const uint8arrayToString = require('uint8arrays/to-string')

const {Seat, Message} = require('./protocol.model')

const decodeMessage = (encodedMessage) => {
    return Message.decode(encodedMessage)
}

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
    return Message.encode({
        type: Message.Type.TAKE_SEAT_REQUEST,
        takeSeatRequest: {
            id,
            timestamp
        }
    })
}

const decodeTakeSeatRequest = (encodedTakeSeatRequest) => {
    const {takeSeatRequest} = Message.decode(encodedTakeSeatRequest)
    return takeSeatRequest
}

const encodeReleaseSeatRequest = ({id, timestamp}) => {
    return Message.encode({
        type: Message.Type.RELEASE_SEAT_REQUEST,
        releaseSeatRequest: {
            id,
            timestamp
        }
    })
}

const decodeReleaseSeatRequest = (encodedReleaseSeatRequest) => {
    const {releaseSeatRequest} = Message.decode(encodedReleaseSeatRequest)
    return releaseSeatRequest
}

const encodeCurrentState = (firstSeat, secondSeat) => {
    return Message.encode({
        type: Message.Type.CURRENT_STATE,
        currentState: {
            firstSeat: seatToBytes(firstSeat),
            secondSeat: seatToBytes(secondSeat)
        }
    })
}

const decodeCurrentState = (encodedCurrentState) => {
    const {currentState: decodeCurrentState} = Message.decode(encodedCurrentState)

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

const getLastUpdateTimestamp = (currentState) => {
    const isFirstSeat = !!currentState.firstSeat
    const isSecondSeat = !!currentState.secondSeat

    if (!(isFirstSeat || isSecondSeat)) {
        return null
    }

    const firstTimestamp = currentState.firstSeat.timestamp;
    const secondTimestamp = currentState.secondSeat.timestamp;
    const now = Date.now()

    if(isFirstSeat && !isSecondSeat) {
        return firstTimestamp
    }else if(isSecondSeat && !isFirstSeat) {
        return secondTimestamp
    }else if (firstTimestamp > now || secondTimestamp > now) {
        return null
    }

    return firstTimestamp > secondTimestamp ? firstTimestamp : secondTimestamp
}

const checkSeatIsFree = (seat) => {
    return seat.type === Seat.Type.FREE
}

const checkSeatIsTakenByPeer = (seat, peerId) => {
    return seat.type === Seat.Type.TAKEN && seat.peerId === peerId
}

module.exports = {
    encodeSeat,
    decodeSeat,
    encodeCurrentState,
    decodeCurrentState,
    encodeTakeSeatRequest,
    decodeTakeSeatRequest,
    encodeReleaseSeatRequest,
    decodeReleaseSeatRequest,
    decodeMessage,
    getLastUpdateTimestamp,
    checkSeatIsFree,
    checkSeatIsTakenByPeer
}