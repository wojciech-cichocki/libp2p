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
        try {
            const node = await createNode(peerId);
            const pubsub = new PubSub(libp2p, '/libp2p/seats-protocol/1.0.0', seatState)
            pubsub.requiresSynchronization()

            setLibp2p(node)
            setPubSub(pubsub)
            setInitialized(true)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!peerId) {
            getOrCreatePeerId().then(setPeerId)
            return
        }

        if (!libp2p) {
            initLibp2p()
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <MainPage></MainPage>
            <div>{peerId ? peerId.id : ('not s')}</div>
            {/*<div>{seatState}</div>*/}
        </ThemeProvider>
    )
}

export default App
