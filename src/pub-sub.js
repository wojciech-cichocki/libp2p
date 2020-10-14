const uint8arrayFromString = require('uint8arrays/from-string')
const uint8arrayToString = require('uint8arrays/to-string')

class PubSub {
    constructor(libp2p, topic, messageHandler) {
        this.libp2p = libp2p
        this.topic = topic
        this.messageHandler = messageHandler
        this.connectedPeers = new Set()

        this.libp2p.connectionManager.on('peer:connect', this.handleConnect.bind(this))
        this.libp2p.connectionManager.on('peer:disconnect', this.handleDisconnect.bind(this))

        this._onMessage = this._onMessage.bind(this)

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

    onStop() {
        this.leaveTopic()
    }

    joinTopic() {
        this.libp2p.pubsub.on(this.topic, this._onMessage)
        this.libp2p.pubsub.subscribe(this.topic)
    }

    leaveTopic() {
        console.log('leave topic')
        this.libp2p.pubsub.removeListener(this.topic, this._onMessage)
        this.libp2p.pubsub.unsubscribe(this.topic)
    }

    _onMessage(message) {
        console.log(message.from)
        console.log(uint8arrayToString(message.data))
    }

    async send(msg) {
        await this.libp2p.pubsub.publish(this.topic, msg)
    }
}

module.exports = PubSub