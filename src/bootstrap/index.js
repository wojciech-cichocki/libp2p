const PeerId = require('peer-id')

const SignalingServer = require('./signaling-server')
const PubSub = require('../protocol/pub-sub')
const {Message, Seat} = require('../protocol/protocol.model')
const {
    decodeMessage, decodeReleaseSeatRequest, decodeTakeSeatRequest, encodeCurrentState,
    decodeCurrentState, getLastUpdateTimestamp, checkSeatIsFree, checkSeatIsTakenByPeer, encodeRequiresSynchronization
} = require('../protocol/protocol.utility')

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

    const genesisFirstSeat = {
        id: 1,
        type: Seat.Type.FREE,
        timestamp: 0
    }
    const genesisSecondSeat = {
        id: 2,
        type: Seat.Type.FREE,
        timestamp: 0
    }

    let state = {
        firstSeat: Object.assign({}, genesisFirstSeat),
        secondSeat: Object.assign({}, genesisSecondSeat),
        init: true
    }

    pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', state);

    // await pubSub.requiresSynchronization()

    setInterval(() => {
        console.log(state)
    }, 5000)
}

initNode()