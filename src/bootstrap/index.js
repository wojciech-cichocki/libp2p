const PeerId = require('peer-id')

const SignalingServer = require('./signaling-server')
const PubSub = require('../pub-sub')
const {Message, Seat} = require('../protocol.model')
const {encodeTakeSeatRequest, decodeMessage, decodeReleaseSeatRequest, decodeTakeSeatRequest, encodeCurrentState, decodeCurrentState} = require('../protocol.utility')

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
                const {firstSeat, secondSeat} = decodeCurrentState(data)
                console.log(firstSeat)
                console.log(secondSeat)
                break
            }
            case Message.Type.TAKE_SEAT_REQUEST: {
                const {id, timestamp} = decodeTakeSeatRequest(data)
                console.log(id)
                console.log(timestamp)
                break
            }
            case Message.Type.RELEASE_SEAT_REQUEST: {
                const {id, timestamp} = decodeReleaseSeatRequest(data)
                console.log(id)
                console.log(timestamp)
                break
            }
        }
    }
    const pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', connectionHandler, receiveMessageHandler);

    setInterval(() => {
        const firstSeat = {
            id: 1,
            type: Seat.Type.FREE,
            timestamp: Date.now()
        }

        const secondSeat = {
            id: 1,
            type: Seat.Type.TAKEN,
            peerId: 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d',
            timestamp: Date.now()
        }

        pubSub.send(encodeCurrentState(firstSeat, secondSeat))

    }, 5000)
}

initNode()