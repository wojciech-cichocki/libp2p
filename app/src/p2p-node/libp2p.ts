const Libp2p = require('libp2p')
const Websockets = require('libp2p-websockets')
const WebrtcStar = require('libp2p-webrtc-star')
const Mplex = require('libp2p-mplex')
const {NOISE} = require('libp2p-noise')
const Bootstrap = require('libp2p-bootstrap')
const KademliaDHT = require('libp2p-kad-dht')
const Gossipsub = require('libp2p-gossipsub')

const listenAddr = '/ip4/127.0.0.1/tcp/15555/ws/p2p-webrtc-star'
const discoveryAddr = '/ip4/127.0.0.1/tcp/63786/ws/p2p/QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'

let _libp2p: any | null

async function getOrCreateLibp2p(peerId: string){
    if(_libp2p != null) {
        return _libp2p
    }

    _libp2p = await Libp2p.create({
        peerId,
        addresses: {
            listen: [
                // Add the signaling server multiaddr
                // '/ip4/127.0.0.1/tcp/15555/ws/p2p-webrtc-star'
                listenAddr
            ]
        },
        modules: {
            transport: [Websockets, WebrtcStar],
            streamMuxer: [Mplex],
            connEncryption: [NOISE],
            peerDiscovery: [Bootstrap],
            dht: KademliaDHT,
            pubsub: Gossipsub
        },
        config: {
            peerDiscovery: {
                bootstrap: {
                    list: [discoveryAddr]
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
    await _libp2p.start()

    return _libp2p
}

export default getOrCreateLibp2p