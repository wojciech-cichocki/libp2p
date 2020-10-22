import getOrCreateLibp2p from "./libp2p";
import {SeatRequest, SeatState} from "../store/types";

const {Message} = require('../protocol/protocol.model')
const {
    encodeRequiresSynchronization, encodeTakeSeatRequest,
    encodeReleaseSeatRequest, decodeMessage, decodeCurrentState,
    decodeTakeSeatRequest, decodeReleaseSeatRequest
} = require('../protocol/protocol.utility')

export enum MessageType {
    CURRENT_STATE,
    TAKE_SEAT_REQUEST,
    RELEASE_SEAT_REQUEST,
    REQUIRES_SYNCHRONIZATION
}


type MessageData = SeatRequest | SeatState | null

export interface Message {
    from: String,
    messageType: MessageType,
    data: MessageData
}

interface IPayload {
    from: string
    data: Uint8Array
}

export interface IPubSub {
    getPeerId: () => string
    requiresSynchronization: () => void
    takeSeat: (seatId: number) => void
    releaseSeat: (seatId: number) => void
    joinTopic: (messageHandler: (message: Message) => void) => void
    leaveTopic: () => void
}

class PubSub implements IPubSub {
    private readonly _topic: string
    private _libp2p: any
    private _connectedPeers: Set<String>

    constructor(libp2p: any, topic: string) {
        this._libp2p = libp2p
        this._topic = topic
        this._connectedPeers = new Set()

        this._libp2p.connectionManager.on('peer:connect', this.handleConnect.bind(this))
        this._libp2p.connectionManager.on('peer:disconnect', this.handleDisconnect.bind(this))

        this._libp2p.pubsub.start()
    }

    public joinTopic(messageHandler: (message: Message) => void) {
        this._libp2p.pubsub.on(this._topic, (payLoad: IPayload) => {
            messageHandler(PubSub.convertPayload(payLoad))
        })

        this._libp2p.pubsub.subscribe(this._topic)

    }

    public leaveTopic() {
        this._libp2p.pubsub.removeListener(this._topic)
        this._libp2p.pubsub.unsubscribe(this._topic)
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

    public getPeerId(): string {
        return this._libp2p.peerId._idB58String
    }

    private static convertPayload(payload: IPayload): Message {
        const {from, data} = payload

        const decodedMessage = decodeMessage(data);
        const messageType: MessageType = decodedMessage.type
        let messageData: MessageData = null

        switch (decodedMessage.type) {
            case Message.Type.CURRENT_STATE: {
                messageData = decodeCurrentState(data)
                break
            }
            case Message.Type.TAKE_SEAT_REQUEST: {
                const {id, timestamp} = decodeTakeSeatRequest(data)
                messageData = {id, timestamp, from}
                break
            }
            case Message.Type.RELEASE_SEAT_REQUEST: {
                console.log('PUBSUB')
                const {id, timestamp} = decodeReleaseSeatRequest(data)
                messageData = {id, timestamp, from}
                break
            }
        }

        return {
            from,
            messageType,
            data: messageData
        }
    }

    private async send(message: any) {
        await this._libp2p.pubsub.publish(this._topic, message)
    }

    private handleConnect(connection: any) {
        if (this._connectedPeers.has(connection.remotePeer.toB58String())) return
        console.info(`Connect with: ${connection.remotePeer.toB58String()}`)
        this._connectedPeers.add(connection.remotePeer.toB58String())
        this.requiresSynchronization()
    }

    private handleDisconnect(connection: any) {
        console.info(`Disconnect with: ${connection.remotePeer.toB58String()}`)
        this._connectedPeers.delete(connection.remotePeer.toB58String())
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