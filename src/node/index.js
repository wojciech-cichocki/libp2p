const {createNode} = require('./node')
const PubSub = require('../pub-sub')
const {Seat, Message} = require('../protocol.model')
const {encodeReleaseSeatRequest, decodeReleaseSeatRequest, encodeSeat, decodeMessage} = require('../protocol.utility')

const initNode = async () => {
    const libp2p = await createNode();
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
                const {id, timestamp} = decodeTakeSeatRequest(data)
                console.log(id)
                console.log(timestamp)
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

    }, 2000)
}

initNode()