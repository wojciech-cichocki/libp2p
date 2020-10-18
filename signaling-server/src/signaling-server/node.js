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
const MDNS = require('libp2p-mdns')
// DHT
const KademliaDHT = require('libp2p-kad-dht')
// PubSub
const Gossipsub = require('libp2p-gossipsub')

const createBootstrapNode = (peerId, listenAddrs) => {
    return Libp2p.create({
        peerId,
        addresses: {
            listen: listenAddrs
        },
        modules: {
            transport: [WebrtcStar, TCP, Websockets],
            streamMuxer: [Mplex],
            connEncryption: [NOISE],
            peerDiscovery: [MDNS],
            dht: KademliaDHT,
            pubsub: Gossipsub
        },
        config: {
            transport: {
                [WebrtcStar.prototype[Symbol.toStringTag]]: {
                    wrtc
                }
            },
            relay: {
                enabled: true,
                hop: {
                    enabled: true,
                    active: false
                }
            },
            dht: {
                enabled: true,
                randomWalk: {
                    enabled: true
                }
            }
        }
    })
}

module.exports = {
    createBootstrapNode
}