const PeerId = require('peer-id')

const SignalingServer = require('./signaling-server')
const PubSub = require('../pub-sub')
const {Message, Seat} = require('../protocol.model')
const {
    encodeTakeSeatRequest, decodeMessage, decodeReleaseSeatRequest, decodeTakeSeatRequest, encodeCurrentState,
    decodeCurrentState, getLastUpdateTimestamp
} = require('../protocol.utility')

const {peer, address, signalingServerPort} = require('../../init-config')
const {createBootstrapNode} = require('./bootstrap-node')

const initNode = async () => {
    const nodeId = await PeerId.createFromJSON(peer)
    const signalingServer = await SignalingServer(signalingServerPort)
    const signalingServerAddress = `/ip4/${signalingServer.info.host}/tcp/${signalingServer.info.port}/ws/p2p-webrtc-star/p2p/${nodeId.toB58String()}`
    const addrs = [...address, signalingServerAddress]

    const libp2p = await createBootstrapNode(nodeId, addrs)
    await libp2p.start()

    const now = Date.now()
    const genesisState = {
        id: 1,
        type: Seat.Type.FREE,
        timestamp: now
    }

    let state = {
        firstSeat: genesisState,
        secondSeat: genesisState,
        init: true
    }

    const connectionHandler = (connection) => {
        console.info(`Connected to ${connection.remotePeer.toB58String()}`)
        pubSub.send(encodeCurrentState(state.firstSeat, state.secondSeat))
    }
    const receiveMessageHandler = ({from, data}) => {
        if(peer.id === from)
            return
        console.log(`from: ${from}`)
        const message = decodeMessage(data);

        switch (message.type) {
            case Message.Type.CURRENT_STATE: {
                const message = decodeCurrentState(data)
                const lastUpdateTimestamp = getLastUpdateTimestamp(state);
                const receivedUpdateTimestamp = getLastUpdateTimestamp(message);

                if(receivedUpdateTimestamp > lastUpdateTimestamp) {
                    const {firstSeat, secondSeat} = message
                    state = {firstSeat, secondSeat, init: true}
                }
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

    await pubSub.send(encodeCurrentState(state.firstSeat, state.secondSeat))

    // setInterval(() => {
    //     const firstSeat = {
    //         id: 1,
    //         type: Seat.Type.FREE,
    //         timestamp: Date.now()
    //     }
    //
    //     const secondSeat = {
    //         id: 1,
    //         type: Seat.Type.TAKEN,
    //         peerId: 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d',
    //         timestamp: Date.now()
    //     }
    //
    //     pubSub.send(encodeCurrentState(firstSeat, secondSeat))
    //
    // }, 5000)
}

initNode()