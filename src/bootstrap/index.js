const PeerId = require('peer-id')
const SignalingServer = require('./signaling-server')
const PubSub = require('../pub-sub')

const {peerId, address, signalingServerPort} = require('../../init-config')
const {createBootstrapNode} = require('./bootstrap-node')

const initNode = async () => {
    const nodeId = await PeerId.createFromJSON(peerId)
    const signalingServer = await SignalingServer(signalingServerPort)
    const signalingServerAddress = `/ip4/${signalingServer.info.host}/tcp/${signalingServer.info.port}/ws/p2p-webrtc-star/p2p/${nodeId.toB58String()}`
    const addrs = [...address, signalingServerAddress]

    const libp2p2 = await createBootstrapNode(nodeId, addrs)
    // need to associate protocol id with protocol handler

    libp2p2.start()
    const pubSub = new PubSub(libp2p2, 'TOPIC', ({from, message}) => console.log(from, message));
}

initNode()