const PeerId = require('peer-id')

const SignalingServer = require('./signaling-server')
const PubSub = require('../pub-sub')
const {Message, Seat} = require('../protocol.model')
const {
    encodeTakeSeatRequest, decodeMessage, decodeReleaseSeatRequest, decodeTakeSeatRequest, encodeCurrentState,
    decodeCurrentState, getLastUpdateTimestamp, checkSeatIsFree, checkSeatIsTakenByPeer
} = require('../protocol.utility')

const {peer, address, signalingServerPort} = require('../../init-config')
const {createBootstrapNode} = require('./bootstrap-node')

const initNode = async () => {
    const nodeId = await PeerId.createFromJSON(peer)
    const signalingServer = await SignalingServer(signalingServerPort)
    const signalingServerAddress = `/ip4/${signalingServer.info.host}/tcp/${signalingServer.info.port}/ws/p2p-webrtc-star/p2p/${nodeId.toB58String()}`
    const addrs = [...address, signalingServerAddress]

    const peerId = peer.id
    const libp2p = await createBootstrapNode(nodeId, addrs)
    await libp2p.start()
    let pubSub

    const now = Date.now()
    const genesisFirstSeat = {
        id: 1,
        type: Seat.Type.FREE,
        timestamp: now
    }
    const genesisSecondSeat = {
        id: 2,
        type: Seat.Type.FREE,
        timestamp: now
    }

    let state = {
        firstSeat: Object.assign({}, genesisFirstSeat),
        secondSeat: Object.assign({}, genesisSecondSeat),
        init: true
    }

    const connectionHandler = (connection) => {
        console.info(`Connected to ${connection.remotePeer.toB58String()}`)
        if (state.init) {
            setTimeout(() => {
                pubSub.send(encodeCurrentState(state.firstSeat, state.secondSeat))
            }, 1000)
        }
    }
    const receiveMessageHandler = ({from, data}) => {
        console.log(`from: ${from}`)
        const message = decodeMessage(data);

        switch (message.type) {
            case Message.Type.CURRENT_STATE: {
                if (peerId === from)
                    return

                const message = decodeCurrentState(data)
                const lastUpdateTimestamp = getLastUpdateTimestamp(state);
                const receivedUpdateTimestamp = getLastUpdateTimestamp(message);

                if (!!lastUpdateTimestamp || receivedUpdateTimestamp > lastUpdateTimestamp) {
                    console.log('current state update')
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
                    state.firstSeat.timestamp = timestamp
                    state.firstSeat.type = Seat.Type.FREE
                    delete state.firstSeat.peerId
                }
                break
            }
        }
    }
    pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', connectionHandler, receiveMessageHandler);

    setInterval(() => {
        console.log(state)
    }, 5000)
}

initNode()