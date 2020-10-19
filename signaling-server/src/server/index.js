const PeerId = require('peer-id')

const SignalingServer = require('./server')
const PubSub = require('../protocol/pub-sub')
const {Seat} = require('../protocol/protocol.model')

const {peer, address, signalingServerPort} = require('./config')
const {createBootstrapNode} = require('./libp2p')

const initNode = async () => {
    const nodeId = await PeerId.createFromJSON(peer)
    const signalingServer = await SignalingServer(signalingServerPort)
    const signalingServerAddress = `/ip4/${signalingServer.info.host}/tcp/${signalingServer.info.port}/ws/p2p-webrtc-star/p2p/${nodeId.toB58String()}`
    console.log(`signalingServerAddress: ${signalingServerAddress}`)
    const addrs = [...address, signalingServerAddress]

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

    pubSub = new PubSub(libp2p, '/libp2p/seats-protocol/1.0.0', state);
    await pubSub.requiresSynchronization()
}

initNode()