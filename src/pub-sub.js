class PubSub {
    constructor(libp2p, topic, messageHandler) {
        this.libp2p = libp2p
        this.topic = topic
        this.messageHandler = messageHandler
        this.connectedPeers = new Set()

        this.libp2p.connectionManager.on('peer:connect', this.handleConnect.bind(this))
        this.libp2p.connectionManager.on('peer:disconnect', this.handleDisconnect.bind(this))
    }

    handleConnect(connection) {
        if (this.connectedPeers.has(connection.remotePeer.toB58String())) return
        this.connectedPeers.add(connection.remotePeer.toB58String())
    }

    handleDisconnect(connection) {
        this.connectedPeers.delete(connection.remotePeer.toB58String())
    }
}

module.exports = PubSub