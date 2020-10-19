const {createNode} = require('./libp2p')
const PubSub = require('../protocol/pub-sub')

const initNode = async () => {
    const libp2p = await createNode();
    await libp2p.start()
    let pubSub

    let state = {
        init: false
    }
    pubSub = new PubSub(libp2p, '/libp2p/seats-protocol/1.0.0', state);

    await pubSub.requiresSynchronization()
}

initNode()