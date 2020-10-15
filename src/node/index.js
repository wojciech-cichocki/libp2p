const {createNode} = require('./node')
const PubSub = require('../pub-sub')
const {Seat} = require('../protocol.model')
const {encodeSeat} = require('../protocol.utility')

const initNode = async () => {
    const libp2p = await createNode();

    await libp2p.start()

    const pubSub = new PubSub(libp2p, '/libp2p/example/test/1.0.0', ({from, message}) => console.log(from, message));

    setInterval(() => {
        pubSub.send(encodeSeat({
            id: 1,
            type: Seat.Type.FREE,
            timestamp: Date.now()
        }))

    }, 5000)
}

initNode()