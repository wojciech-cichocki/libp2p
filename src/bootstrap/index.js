const PeerId = require('peer-id')

const SignalingServer = require('./signaling-server')
const PubSub = require('../pub-sub')
const {Seat, Message} = require('../protocol.model')
const {encodeSeat, decodeSeat, encodeReleaseSeatRequest, decodeMessage, decodeReleaseSeatRequest} = require('../protocol.utility')

const {peerId, address, signalingServerPort} = require('../../init-config')
const {createBootstrapNode} = require('./bootstrap-node')

const initNode = async () => {
    const nodeId = await PeerId.createFromJSON(peerId)
    const signalingServer = await SignalingServer(signalingServerPort)
    const signalingServerAddress = `/ip4/${signalingServer.info.host}/tcp/${signalingServer.info.port}/ws/p2p-webrtc-star/p2p/${nodeId.toB58String()}`
    const addrs = [...address, signalingServerAddress]

    const libp2p = await createBootstrapNode(nodeId, addrs)
    await libp2p.start()

    const connectionHandler = (connection) => {
        console.info(`Connected to ${connection.remotePeer.toB58String()}`)
    }
    const receiveMessageHandler = ({from, data}) => {
        console.log(`from: ${from}`)
        const message = decodeMessage(data);
        switch (message.type) {

            case Message.Type.CURRENT_STATE: {
                console.log('current state')
                break
            }
            case Message.Type.TAKE_SEAT_REQUEST: {
                console.log('take seat request')
                break
            }
            case Message.Type.RELEASE_SEAT_REQUEST: {
                const {id, timestamp} = decodeReleaseSeatRequest(data)
                console.log(id)
                console.log(timestamp)
            }
        }
    }
    const pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', connectionHandler, receiveMessageHandler);

    setInterval(() => {
        pubSub.send(encodeReleaseSeatRequest({
            id: 1,
            timestamp: Date.now()
        }))

    }, 1000)
}

initNode()