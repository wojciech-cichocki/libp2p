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

const {peerId} = require('../signaling-server/config')

const createNode = () => {
    return Libp2p.create({
        addresses: {
            listen: [
                '/ip4/0.0.0.0/tcp/0',
                '/ip4/0.0.0.0/tcp/0/ws',
                `/ip4/127.0.0.1/tcp/15555/ws/p2p-webrtc-star/`
            ]
        },
        modules: {
            transport: [WebrtcStar, TCP, Websockets],
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
                    list: [`/ip4/127.0.0.1/tcp/63785/ipfs/${peerId}`]
                },
                dht: {
                    enabled: true,
                    randomWalk: {
                        enabled: true
                    }
                }
            }
        }
    })
}

module.exports = {
    createNode
}