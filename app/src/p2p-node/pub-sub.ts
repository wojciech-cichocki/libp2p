import getOrCreateLibp2p from "./libp2p";

const {Message} = require('../protocol/protocol.model')
const {
    encodeRequiresSynchronization, encodeTakeSeatRequest,
    encodeReleaseSeatRequest, decodeMessage, decodeCurrentState
} = require('../protocol/protocol.utility')

// import {useDispatch} from "react-redux";
// import {currentStateResponse} from "../store/actions";
// import {SeatState} from "../store/types";


interface IPayload {
    from: string
    data: Uint8Array
}

export interface IPubSub {
    requiresSynchronization: () => void,
    takeSeat: (seatId: number) => void,
    releaseSeat: (seatId: number) => void,
    setMessageHandler: (messageHandler: (payload: IPayload) => void) => void
}

class PubSub implements IPubSub {
    private _libp2p: any
    private readonly _topic: string
    private _connectedPeers: Set<String>
    private _messageHandler: ((payload: IPayload) => void) | null = null

    constructor(libp2p: any, topic: string) {
        this._libp2p = libp2p
        this._topic = topic
        this._connectedPeers = new Set()

        this._libp2p.connectionManager.on('peer:connect', this.handleConnect.bind(this))
        this._libp2p.connectionManager.on('peer:disconnect', this.handleDisconnect.bind(this))

        if (this._libp2p.isStarted()) this.joinTopic()
    }

    public setMessageHandler(messageHandler: (payLoad: IPayload) => void) {
        this._messageHandler = messageHandler
    }

    public requiresSynchronization() {
        setTimeout(() => {
            this.send(encodeRequiresSynchronization())
        }, 1000)
    }

    public async takeSeat(id: number) {
        await this.send(encodeTakeSeatRequest({
            id: id,
            timestamp: Date.now()
        }))
    }

    public async releaseSeat(id: number) {
        await this.send(encodeReleaseSeatRequest({
            id: id,
            timestamp: Date.now()
        }))
    }

    private async send(message: any) {
        await this._libp2p.pubsub.publish(this._topic, message)
    }

    private handleConnect(connection: any) {
        if (this._connectedPeers.has(connection.remotePeer.toB58String())) return
        console.info(`Connect with: ${connection.remotePeer.toB58String()}`)
        this._connectedPeers.add(connection.remotePeer.toB58String())
    }

    private handleDisconnect(connection: any) {
        console.info(`Disconnect with: ${connection.remotePeer.toB58String()}`)
        this._connectedPeers.delete(connection.remotePeer.toB58String())
    }

    private joinTopic() {
        this._libp2p.pubsub.on(this._topic, this._onMessage)
        this._libp2p.pubsub.subscribe(this._topic)
    }

    private leaveTopic() {
        this._libp2p.pubsub.removeListener(this._topic, this._onMessage)
        this._libp2p.pubsub.unsubscribe(this._topic)
    }

    private _onMessage(payload: IPayload) {
        console.log('on message')
        console.log(this._messageHandler)
        if (this._messageHandler != null) {
            this._messageHandler(payload)
        }
    }
}

export const topic: string = '/libp2p/seats-protocol/1.0.0'
let _pubSub: IPubSub

export async function getOrCreatePubSub(): Promise<IPubSub> {
    if (_pubSub != null) {
        return _pubSub
    }

    const libp2p = await getOrCreateLibp2p();
    _pubSub = new PubSub(libp2p, topic)

    return _pubSub
}