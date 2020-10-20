// Libp2p Core
const Libp2p = require('libp2p')

// Transports
const Websockets = require('libp2p-websockets')
const WebrtcStar = require('libp2p-webrtc-star')

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


const createLibp2p = async () => {
    const libp2p = await Libp2p.create({
        addresses: {
            listen: [
                `/ip4/127.0.0.1/tcp/15555/ws/p2p-webrtc-star/`
            ]
        },
        modules: {
            transport: [WebrtcStar, Websockets],
            streamMuxer: [Mplex],
            connEncryption: [NOISE],
            peerDiscovery: [Bootstrap, MDNS],
            dht: KademliaDHT,
            pubsub: Gossipsub
        },
        config: {
            peerDiscovery: {
                bootstrap: {
                    list: ['/ip4/127.0.0.1/tcp/63786/ws/p2p/QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d']
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

    await libp2p.start()
    return libp2p
}

export default createLibp2p