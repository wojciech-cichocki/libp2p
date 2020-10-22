const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const Websockets = require('libp2p-websockets')
const WebrtcStar = require('libp2p-webrtc-star')
const wrtc = require('wrtc')
const Mplex = require('libp2p-mplex')
const {NOISE} = require('libp2p-noise')
const MDNS = require('libp2p-mdns')
const KademliaDHT = require('libp2p-kad-dht')
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