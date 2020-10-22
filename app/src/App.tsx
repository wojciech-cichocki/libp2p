import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {currentStateResponse, initLibp2p, requiresSynchronization} from "./store/actions";
import {getOrCreatePubSub, IPubSub, Message, MessageType} from "./p2p-node/pub-sub";
import {SeatState} from "./store/types";
import {SeatCardSelector} from "./store/selectors/selectors";
import {MainPage} from "./containers/MainPage/MainPage";

function App() {
    const dispatch = useDispatch()

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
                case MessageType.TAKE_SEAT_REQUEST: {
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
        <MainPage/>
    )
}

export default App
