// Libp2p Core
const Libp2p = require('libp2p')

// Transports
const TCP = require('libp2p-tcp')
const Websockets = require('libp2p-websockets')
const WebrtcStar = require('libp2p-webrtc-star')

// wrtc for example-node to supplement WebrtcStar
const wrtc = require('wrtc')

// Stream Multiplexers
const Mplex = require('libp2p-mplex')
// Encryption
const {NOISE} = require('libp2p-noise')
// Discovery
const Bootstrap = require('libp2p-bootstrap')
const MDNS = require('libp2p-mdns')
// DHT
const KademliaDHT = require('libp2p-kad-dht')
// PubSub
const Gossipsub = require('libp2p-gossipsub')

export async function createNode(peerId) {
    const node = await Libp2p.create({
        peerId,
        addresses: {
            listen: [
                '/ip4/0.0.0.0/tcp/0',
                '/ip4/0.0.0.0/tcp/0/ws',
                `/ip4/127.0.0.1/tcp/15555/ws/p2p-webrtc-star/`
            ]
        },
        modules: {
            transport: [Websockets, WebrtcStar],
            streamMuxer: [Mplex],
            connEncryption: [NOISE],
            peerDiscovery: [Bootstrap, MDNS],
            dht: KademliaDHT,
            pubsub: Gossipsub
        },
        config: {
            transport: {
                [WebrtcStar.prototype[Symbol.toStringTag]]: {
                    wrtc
                }
            },
            peerDiscovery: {
                bootstrap: {
                    list: [`/ip4/0.0.0.0/tcp/15555/ws/p2p-webrtc-star/p2p/QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d`]
                }
            },
            dht: {
                enabled: true,
                randomWalk: {
                    enabled: true
                }
            }
        }
    });
    await node.start()

    return node
}