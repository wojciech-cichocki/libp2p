import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getOrCreatePubSub,
  IPubSub,
  Message,
  MessageType,
} from './p2p-node/pub-sub';
import { MainPage } from './pages/MainPage/MainPage';
import {
  currentStateResponse,
  getLibp2p,
  releaseSeatResponse,
  takeSeatResponse,
} from './store/actions';
import { SignalingServerError } from './store/selectors/selectors';
import { SeatRequest, SeatState } from './store/types';
import FullHeight from './wrappers/full-height/FullHeight';

function App(): JSX.Element {
  const signalingServerError = useSelector(SignalingServerError);

  const dispatch = useDispatch();

  useEffect((): void => {
    const setMessageHandler = async (): Promise<void> => {
      const pubSub: IPubSub = await getOrCreatePubSub();

      pubSub.joinTopic((message: Message): void => {
        switch (message.messageType) {
          case MessageType.CURRENT_STATE: {
            if (message.from === pubSub.getPeerId()) {
              break;
            }
            dispatch(currentStateResponse(message.data as SeatState));
            break;
          }
          case MessageType.TAKE_SEAT_REQUEST: {
            dispatch(takeSeatResponse(message.data as SeatRequest));
            break;
          }
          case MessageType.RELEASE_SEAT_REQUEST: {
            dispatch(releaseSeatResponse(message.data as SeatRequest));
            break;
          }
        }
      });
    };

    dispatch(getLibp2p());
    setMessageHandler();
  });

  if (signalingServerError) {
    throw Error('There is a problem trying to connect to the signaling server');
  }

  return (
    <FullHeight verticalAlign={true} horizontalAlign={true}>
      <MainPage />
    </FullHeight>
  );
}

export default App;
