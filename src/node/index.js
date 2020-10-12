const {createNode} = require('./node')

const initNode = async () => {
    const libp2p = await createNode();

    libp2p.connectionManager.on('peer:connect', (connection) => {
        console.info(`Connected to ${connection.remotePeer.toB58String()}`)
    })

    libp2p.start()
}

initNode()