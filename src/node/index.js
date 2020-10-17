const {createNode} = require('./node')
const PubSub = require('../pub-sub')
const {Message} = require('../protocol.model')
const {
    encodeTakeSeatRequest, decodeMessage, decodeReleaseSeatRequest, decodeTakeSeatRequest, encodeCurrentState,
    decodeCurrentState, getLastUpdateTimestamp
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
        if(state.init) {
            setTimeout(() => {
                pubSub.send(encodeCurrentState(state.firstSeat, state.secondSeat))
            }, 1000)
        }
    }
    const receiveMessageHandler = ({from, data}) => {
        console.log(`from: ${from}`)
        if(peerId === from) {
            return
        }
        const message = decodeMessage(data);

        switch (message.type) {
            case Message.Type.CURRENT_STATE: {
                const message = decodeCurrentState(data)
                console.log(message)
                const lastUpdateTimestamp = getLastUpdateTimestamp(state);
                const receivedUpdateTimestamp = getLastUpdateTimestamp(message);

                if(!!lastUpdateTimestamp || receivedUpdateTimestamp > lastUpdateTimestamp) {
                    console.log('current state update')
                    const {firstSeat, secondSeat} = message
                    state = {firstSeat, secondSeat, init: true}
                    console.log(state)
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
    pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', connectionHandler, receiveMessageHandler);

    // setInterval(() => {
    //     pubSub.send(encodeTakeSeatRequest({
    //         id: 1,
    //         timestamp: Date.now()
    //     }))
    //
    // }, 2000)
}

initNode()