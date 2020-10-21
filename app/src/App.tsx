import React, {useEffect, useState} from 'react'
import {ThemeProvider} from '@material-ui/core'
import {theme} from './static/theme'
import {MainPage} from './containers/MainPage/MainPage'
import {PubSub} from './protocol/pub-sub'
import {SeatAction} from "./store/types";
import {useDispatch} from "react-redux";
import {actions} from "@storybook/addon-actions";
import {initLibp2p, requiresSynchronization} from "./store/actions";
import {getOrCreatePubSub, IPubSub} from "./p2p-node/pub-sub";

function App() {
    const [peerId, setPeerId] = useState()
    const [libp2p, setLibp2p] = useState()
    const [pubSub, setPubSub] = useState()
    const [initialized, setInitialized] = useState(false)
    const [seatState, setSeatState] = useState({init: false})

    const setEventHandler = async () => {
        const pubSub: IPubSub = await getOrCreatePubSub();
        pubSub.setMessageHandler(payload => {
            const {from, data} = payload
            console.log(`from: ${from}`)
        })

        dispatch(requiresSynchronization())
    }

    const dispatch = useDispatch()

    useEffect(() => {
        // initPeerId()
        // initLibp2p()
        setEventHandler()
    })

    return (
        <div>Hello</div>
        // <ThemeProvider theme={theme}>
        /*<div>{peerId ? peerId.id : ('not initialized')}</div>*/
        /*<MainPage/>*/
        // </ThemeProvider>
    )
}

export default App
