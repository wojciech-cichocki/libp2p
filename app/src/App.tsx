import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {currentStateResponse, initLibp2p, releaseSeatResponse, takeSeatResponse} from "./store/actions";
import {getOrCreatePubSub, IPubSub, Message, MessageType} from "./p2p-node/pub-sub";
import {SeatRequest, SeatState} from "./store/types";
import {MainPage} from "./pages/MainPage/MainPage";
import {SignalingServerError} from "./store/selectors/selectors";

function App() {
    const dispatch = useDispatch()
    const signalingServerError = useSelector(SignalingServerError);

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
                    dispatch(takeSeatResponse(message.data as SeatRequest))
                    break
                }
                case MessageType.RELEASE_SEAT_REQUEST: {
                    dispatch(releaseSeatResponse(message.data as SeatRequest))
                    break
                }
            }
        })
    }

    useEffect(() => {
        dispatch(initLibp2p())
        setMessageHandler()
    }, [])

    if (signalingServerError) {
        throw Error("There is a problem trying to connect to the signaling server")
    }

    return (
        <MainPage/>
    )
}

export default App
