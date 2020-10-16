const {createNode} = require('./node')
const PubSub = require('../pub-sub')
const {Seat} = require('../protocol.model')
const {encodeSeat, decodeSeat} = require('../protocol.utility')

const initNode = async () => {
    const libp2p = await createNode();
    await libp2p.start()

    const connectionHandler = (connection) => {
        console.info(`Connected to ${connection.remotePeer.toB58String()}`)
    }
    const receiveMessageHandler = ({from, data}) => {
        console.log(`from: ${from}`)
        console.log(decodeSeat(data))
    }
    const pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', connectionHandler, receiveMessageHandler);

    setInterval(() => {
        pubSub.send(encodeSeat({
            id: 1,
            type: Seat.Type.FREE,
            timestamp: Date.now()
        }))

    }, 5000)
}

initNode()