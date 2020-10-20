const {connectionHandler, receiveMessageHandler} = require('./protocol.handler')
const {encodeRequiresSynchronization, encodeTakeSeatRequest, encodeReleaseSeatRequest} = require('./protocol.utility')

export class PubSub {
    constructor(libp2p, topic, state) {
        this.libp2p = libp2p
        this.topic = topic
        this.state = state
        this.connectionHandler = connectionHandler
        this.receiveMessageHandler = receiveMessageHandler
        this.connectedPeers = new Set()

        this.libp2p.connectionManager.on('peer:connect', this.handleConnect.bind(this))
        this.libp2p.connectionManager.on('peer:disconnect', this.handleDisconnect.bind(this))
        this._onMessage = this._onMessage.bind(this)

        if (this.libp2p.isStarted()) this.joinTopic()
    }

    handleConnect(connection) {
        if (this.connectedPeers.has(connection.remotePeer.toB58String())) return
        this.connectedPeers.add(connection.remotePeer.toB58String())

        if (this.connectionHandler) {
            this.connectionHandler(connection)
        }
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
        this.libp2p.pubsub.removeListener(this.topic, this._onMessage)
        this.libp2p.pubsub.unsubscribe(this.topic)
    }

    _onMessage(message) {
        const newState = this.receiveMessageHandler(message, this, this.state);
        this.state = newState
    }

    async send(msg) {
        await this.libp2p.pubsub.publish(this.topic, msg)
    }

    requiresSynchronization() {
        setTimeout(() => {
            this.send(encodeRequiresSynchronization())
        }, 1000)
    }

    takeSeat(id) {
        this.send(encodeTakeSeatRequest({
            id: id,
            timestamp: Date.now()
        }))
    }

    releaseSeat(id) {
        this.send(encodeReleaseSeatRequest({
            id: id,
            timestamp: Date.now()
        }))
    }
}

export default PubSub