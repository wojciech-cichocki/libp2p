import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {currentStateResponse, initLibp2p, requiresSynchronization} from "./store/actions";
import {getOrCreatePubSub, IPubSub, Message, MessageType} from "./p2p-node/pub-sub";
import {SeatState} from "./store/types";
import {TestingSelector} from "./store/selectors";

function App() {
    const dispatch = useDispatch()
    const seatState: SeatState = useSelector(TestingSelector)

    const setMessageHandler = async () => {
        const pubSub: IPubSub = await getOrCreatePubSub()

        pubSub.joinTopic((message: Message) => {
            switch (message.messageType) {
                case MessageType.CURRENT_STATE: {
                    if (message.from === pubSub.getPeerId()) {
                        break
                    }
                    dispatch(currentStateResponse(message.data as SeatState))
                    break
                }
            }
        })
    }

    useEffect(() => {
        dispatch(initLibp2p())
        setMessageHandler()
    }, [])

    return (
        <div>{seatState.init ? 'init' : 'not init'}</div>
        // <ThemeProvider theme={theme}>
        /*<div>{peerId ? peerId.id : ('not initialized')}</div>*/
        /*<MainPage/>*/
        // </ThemeProvider>
    )
}

export default App
