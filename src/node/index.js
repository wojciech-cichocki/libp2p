const {createNode} = require('./node')
const PubSub = require('../pub-sub')
const {Message, Seat} = require('../protocol.model')
const {
    encodeTakeSeatRequest, decodeMessage, decodeReleaseSeatRequest, decodeTakeSeatRequest, encodeCurrentState,
    decodeCurrentState, getLastUpdateTimestamp, checkSeatIsFree, checkSeatIsTakenByPeer, encodeReleaseSeatRequest,
    encodeRequiresSynchronization
} = require('../protocol.utility')

const initNode = async () => {
    const libp2p = await createNode();
    const peerId = libp2p.peerId._idB58String
    await libp2p.start()
    let pubSub

    let state = {
        init: false
    }

    const connectionHandler = (connection) => {
        console.info(`Connected to ${connection.remotePeer.toB58String()}`)
    }
    const receiveMessageHandler = ({from, data}) => {
        console.log(`from: ${from}`)
        const message = decodeMessage(data);

        switch (message.type) {
            case Message.Type.REQUIRES_SYNCHRONIZATION: {
                console.log('synch')
                if (peerId === from){
                    return
                }
                if (state.init) {
                    pubSub.send(encodeCurrentState(state.firstSeat, state.secondSeat))
                }
                break
            }
            case Message.Type.CURRENT_STATE: {
                if (peerId === from){
                    return
                }

                const message = decodeCurrentState(data)
                const currentTimestamp = getLastUpdateTimestamp(state);
                const receivedTimestamp = getLastUpdateTimestamp(message);

                console.log(`currentLastTimestamp: ${currentTimestamp}`)
                console.log(`receivedLastTimestamp: ${receivedTimestamp}`)

                if (currentTimestamp === null || receivedTimestamp > currentTimestamp) {
                    console.log('current state update')
                    const {firstSeat, secondSeat} = message
                    state = {firstSeat, secondSeat, init: true}
                }
                break
            }
            case Message.Type.TAKE_SEAT_REQUEST: {
                if (!state.init)
                    return

                const {id, timestamp} = decodeTakeSeatRequest(data)
                const firstSeat = state.firstSeat
                const secondSeat = state.secondSeat

                console.log(checkSeatIsFree(state.firstSeat));

                if (id === firstSeat.id && checkSeatIsFree(state.firstSeat)) {
                    state.firstSeat.timestamp = timestamp
                    state.firstSeat.type = Seat.Type.TAKEN
                    state.firstSeat.peerId = from

                } else if (id === secondSeat.id && checkSeatIsFree(state.secondSeat)) {
                    state.secondSeat.timestamp = timestamp
                    state.secondSeat.type = Seat.Type.TAKEN
                    state.secondSeat.peerId = from
                }
                break
            }
            case Message.Type.RELEASE_SEAT_REQUEST: {
                const {id, timestamp} = decodeReleaseSeatRequest(data)
                const firstSeat = state.firstSeat
                const secondSeat = state.secondSeat

                if (id === firstSeat.id && checkSeatIsTakenByPeer(state.firstSeat, from)) {
                    state.firstSeat.timestamp = timestamp
                    state.firstSeat.type = Seat.Type.FREE
                    delete state.firstSeat.peerId

                } else if (id === secondSeat.id && checkSeatIsTakenByPeer(state.secondSeat, from)) {
                    state.secondSeat.timestamp = timestamp
                    state.secondSeat.type = Seat.Type.FREE
                    delete state.secondSeat.peerId
                }
                break
            }
        }
    }
    pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', connectionHandler, receiveMessageHandler);

    setTimeout(() => {
        pubSub.send(encodeRequiresSynchronization())
    }, 1000)

    setTimeout(() => {
        pubSub.send(encodeTakeSeatRequest({
            id: 1,
            timestamp: Date.now()
        }))
    }, 2000)

    setInterval(() => {
        console.log(state)
    }, 5000)
}

initNode()