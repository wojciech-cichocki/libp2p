const SignalingServer = require('libp2p-webrtc-star/src/sig-server')

module.exports = (port) => {
    return SignalingServer.start({
        port
    })
}