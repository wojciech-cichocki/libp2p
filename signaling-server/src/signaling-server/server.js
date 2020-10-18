const Server = require('libp2p-webrtc-star/src/sig-server')

module.exports = (port) => {
    return Server.start({
        port
    })
}