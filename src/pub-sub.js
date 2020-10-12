class PubSub {
    constructor(libp2p, topic, messageHandler) {
        this.libp2p = libp2p
        this.topic = topic
        this.messageHandler = messageHandler
        this.connectedPeers = new Set()

        this.libp2p.connectionManager.on('peer:connect', this.handleConnect.bind(this))
        this.libp2p.connectionManager.on('peer:disconnect', this.handleDisconnect.bind(this))

        if (this.libp2p.isStarted()) this.joinTopic()
    }

    handleConnect(connection) {
        console.info(`Connected to ${connection.remotePeer.toB58String()}`)
        if (this.connectedPeers.has(connection.remotePeer.toB58String())) return
        this.connectedPeers.add(connection.remotePeer.toB58String())
    }

    handleDisconnect(connection) {
        console.info(`Disconnect ${connection.remotePeer.toB58String()}`)
        this.connectedPeers.delete(connection.remotePeer.toB58String())
    }

    onStart() {
        this.joinTopic()
    }

    joinTopic() {
        this.libp2p.pubsub.on(this.topic, () => console.log('on message'))
        this.libp2p.pubsub.subscribe(this.topic)
    }
}

module.exports = PubSub