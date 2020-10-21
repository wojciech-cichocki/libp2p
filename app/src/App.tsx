import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {initLibp2p, requiresSynchronization} from "./store/actions";
import {getOrCreatePubSub, IPubSub, Message, MessageType} from "./p2p-node/pub-sub";

function App() {

    const setMessageHandler = async () => {
        const pubSub: IPubSub = await getOrCreatePubSub();

        pubSub.joinTopic((message: Message) => {
            console.log(message)

            switch (message.messageType) {
                case MessageType.CURRENT_STATE: {
                }
            }
        })
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requiresSynchronization())
        setMessageHandler()
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
