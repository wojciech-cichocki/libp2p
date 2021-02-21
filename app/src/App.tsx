import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {currentStateResponse, getLibp2p, releaseSeatResponse, takeSeatResponse} from "./store/actions";
import {getOrCreatePubSub, IPubSub, Message, MessageType} from "./p2p-node/pub-sub";
import {SeatRequest, SeatState} from "./store/types";
import {MainPage} from "./pages/MainPage/MainPage";
import {SignalingServerError} from "./store/selectors/selectors";
import FullHeight from "./wrappers/full-height/FullHeight";

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
        dispatch(getLibp2p())
        setMessageHandler()
    }, [])

    if (signalingServerError) {
        throw Error("There is a problem trying to connect to the signaling server")
    }

    return (
        <FullHeight verticalAlign={true} horizontalAlign={true}>
            <MainPage/>
        </FullHeight>
    )
}

export default App
