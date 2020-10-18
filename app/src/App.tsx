import React, {useEffect, useState} from 'react'
import {ThemeProvider} from '@material-ui/core'
import {theme} from './static/theme'
import {MainPage} from './containers/MainPage/MainPage'
import {getOrCreatePeerId} from "./p2p-node/peerId";
import {createNode} from "./p2p-node/libp2p";

function App() {
    const [peerId, setPeerId] = useState()
    const [libp2p, setLibp2p] = useState()
    const [initialized, setInitialized] = useState(false)

    const initLibp2p = async () => {
        const node = await createNode(peerId);
        await node.start()

        setLibp2p(node)
        setInitialized(true)
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
        </ThemeProvider>
    )
}

export default App
