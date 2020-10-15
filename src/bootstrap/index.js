const PeerId = require('peer-id')

const SignalingServer = require('./signaling-server')
const PubSub = require('../pub-sub')
const {Seat} = require('../protocol.model')
const {encodeSeat} = require('../protocol.utility')

const {peerId, address, signalingServerPort} = require('../../init-config')
const {createBootstrapNode} = require('./bootstrap-node')

const initNode = async () => {
    const nodeId = await PeerId.createFromJSON(peerId)
    const signalingServer = await SignalingServer(signalingServerPort)
    const signalingServerAddress = `/ip4/${signalingServer.info.host}/tcp/${signalingServer.info.port}/ws/p2p-webrtc-star/p2p/${nodeId.toB58String()}`
    const addrs = [...address, signalingServerAddress]

    const libp2p = await createBootstrapNode(nodeId, addrs)

    await libp2p.start()
    const pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', ({from, message}) => console.log(from, message));

    setInterval(() => {
        pubSub.send(encodeSeat({
            id: 1,
            type: Seat.Type.TAKEN,
            peerId: 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d',
            timestamp: Date.now()
        }))

    }, 5000)
}

initNode()