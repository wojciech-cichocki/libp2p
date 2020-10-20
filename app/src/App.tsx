import React, {useEffect, useState} from 'react'
import {ThemeProvider} from '@material-ui/core'
import {theme} from './static/theme'
import {MainPage} from './containers/MainPage/MainPage'
import {getOrCreatePeerId} from "./p2p-node/peerId";
import {createNode} from "./p2p-node/libp2p";
import {PubSub} from './protocol/pub-sub'


function App() {
    const [peerId, setPeerId] = useState()
    const [libp2p, setLibp2p] = useState()
    const [pubSub, setPubSub] = useState()
    const [initialized, setInitialized] = useState(false)
    const [seatState, setSeatState] = useState({init: false})

    const initLibp2p = async () => {
        if (!libp2p) {
            try {
                const libp2p = await createNode(peerId);
                setLibp2p(libp2p)

                const pubsub = new PubSub(libp2p, '/libp2p/seats-protocol/1.0.0', seatState)
                pubsub.requiresSynchronization()

                setPubSub(pubsub)
                setInitialized(true)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const initPeerId = () => {
        if (!peerId) {
            getOrCreatePeerId().then(setPeerId)
            return
        }
    }

    useEffect(() => {
        initPeerId()
        initLibp2p()
    })

    return (
        <ThemeProvider theme={theme}>
            <div>{peerId ? peerId.id : ('not initialized')}</div>
            {/*<MainPage/>*/}
        </ThemeProvider>
    )
}

export default App
