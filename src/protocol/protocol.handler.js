const {
    decodeMessage, decodeReleaseSeatRequest, decodeTakeSeatRequest, encodeCurrentState,
    decodeCurrentState, getLastUpdateTimestamp, checkSeatIsFree, checkSeatIsTakenByPeer
} = require('./protocol.utility')
const {Message, Seat} = require('../protocol/protocol.model')

const connectionHandler = (connection) => {
    console.info(`Connected to ${connection.remotePeer.toB58String()}`)
}

const receiveMessageHandler = ({from, data}, pubSub, state) => {
    const peerId = pubSub.libp2p.peerId._idB58String
    const message = decodeMessage(data);

    switch (message.type) {
        case Message.Type.REQUIRES_SYNCHRONIZATION: {
            if (peerId === from) {
                return state
            }

            if (state.init) {
                pubSub.send(encodeCurrentState(state.firstSeat, state.secondSeat))
            }
            break
        }
        case Message.Type.CURRENT_STATE: {
            if (peerId === from) {
                return state
            }
            const message = decodeCurrentState(data)
            const currentTimestamp = getLastUpdateTimestamp(state);
            const receivedTimestamp = getLastUpdateTimestamp(message);

            if (currentTimestamp === null || receivedTimestamp > currentTimestamp) {
                console.log('update state')
                const {firstSeat, secondSeat} = message
                state = {firstSeat, secondSeat, init: true}
            }
            break
        }
        case Message.Type.TAKE_SEAT_REQUEST: {
            const {id, timestamp} = decodeTakeSeatRequest(data)
            const firstSeat = state.firstSeat
            const secondSeat = state.secondSeat

            if (id === firstSeat.id && checkSeatIsFree(state.firstSeat)) {
                takeSeat(state.firstSeat, from, timestamp)

            } else if (id === secondSeat.id && checkSeatIsFree(state.secondSeat)) {
                takeSeat(state.secondSeat, from, timestamp)
            }
            break
        }
        case Message.Type.RELEASE_SEAT_REQUEST: {
            const {id, timestamp} = decodeReleaseSeatRequest(data)
            const firstSeat = state.firstSeat
            const secondSeat = state.secondSeat

            if (id === firstSeat.id && checkSeatIsTakenByPeer(state.firstSeat, from)) {
                releaseSeat(state.firstSeat, timestamp)

            } else if (id === secondSeat.id && checkSeatIsTakenByPeer(state.secondSeat, from)) {
                releaseSeat(state.secondSeat, timestamp)
            }
            break
        }
    }
    return state
}

const takeSeat = (seat, peerId, timestamp) => {
    seat.timestamp = timestamp
    seat.type = Seat.Type.TAKEN
    seat.peerId = peerId
}

const releaseSeat = (seat, timestamp) => {
    seat.timestamp = timestamp
    seat.type = Seat.Type.FREE
    delete seat.peerId
}

module.exports = {
    connectionHandler,
    receiveMessageHandler
}