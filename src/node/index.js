const {createNode} = require('./node')
const PubSub = require('../pub-sub')

const initNode = async () => {
    const libp2p = await createNode();

    await libp2p.start()

    const pubSub = new PubSub(libp2p, 'TOPIC', ({from, message}) => console.log(from, message));

    await pubSub.send('Test msg [NODE]')
}

initNode()