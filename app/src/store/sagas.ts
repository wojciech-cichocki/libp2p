import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import { getOrCreatePubSub, IPubSub } from '../p2p-node/pub-sub';
import { handleSignalingServerError, SeatAction, setPeerId } from './actions';

function* handleRequiresSynchronization(): Generator<
  any | Promise<IPubSub> | void,
  void,
  IPubSub
> {
  const pubSub: IPubSub = yield getOrCreatePubSub();
  yield pubSub.requiresSynchronization();
  yield put(setPeerId(pubSub.getPeerId()));
}

function* handleGetLibp2p(): Generator<Promise<IPubSub> | any, void, IPubSub> {
  try {
    const pubSub: IPubSub = yield getOrCreatePubSub();
    yield put(setPeerId(pubSub.getPeerId()));
  } catch {
    yield put(handleSignalingServerError());
  }
}

function* handleTakeSeat(
  action: PayloadAction<any, any>
): Generator<Promise<IPubSub> | void, void, IPubSub> {
  const pubSub: IPubSub = yield getOrCreatePubSub();
  yield pubSub.takeSeat(action.payload);
}

function* handleReleaseSeat(
  action: PayloadAction<any, any>
): Generator<Promise<IPubSub> | void, void, IPubSub> {
  const pubSub: IPubSub = yield getOrCreatePubSub();
  yield pubSub.releaseSeat(action.payload);
}

function* listenGetLibp2p(): Generator<any> {
  yield takeEvery(SeatAction.GET_LIB_P2P, handleGetLibp2p);
}

function* listenRequiresSynchronization(): Generator<any> {
  yield takeEvery(
    SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST,
    handleRequiresSynchronization
  );
}

function* listenTakeSeat(): Generator<any> {
  yield takeEvery(SeatAction.TAKE_SEAT_REQUEST, handleTakeSeat);
}

function* listenReleaseSeat(): Generator<any> {
  yield takeEvery(SeatAction.RELEASE_SEAT_REQUEST, handleReleaseSeat);
}

export function* seatSaga(): Generator<any> {
  yield all([
    fork(listenGetLibp2p),
    fork(listenRequiresSynchronization),
    fork(listenTakeSeat),
    fork(listenReleaseSeat),
  ]);
}
