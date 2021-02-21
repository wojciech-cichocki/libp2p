import {all, put, takeEvery, fork} from 'redux-saga/effects'
import {getOrCreatePubSub, IPubSub} from "../p2p-node/pub-sub";
import {handleSignalingServerError, SeatAction, setPeerId} from "./actions";
import {PayloadAction} from "typesafe-actions";

function* handleRequiresSynchronization() {
    const pubSub: IPubSub = yield getOrCreatePubSub();
    yield pubSub.requiresSynchronization()
    yield put(setPeerId(pubSub.getPeerId()))
}

function* handleGetLibp2p() {
    try {
        const pubSub: IPubSub = yield getOrCreatePubSub()
        yield put(setPeerId(pubSub.getPeerId()))
    }catch {
        yield put(handleSignalingServerError())
    }
}

function* handleTakeSeat(action: PayloadAction<any, any>) {
    const pubSub: IPubSub = yield getOrCreatePubSub()
    yield pubSub.takeSeat(action.payload)
}

function* handleReleaseSeat(action: PayloadAction<any, any>) {
    const pubSub: IPubSub = yield getOrCreatePubSub()
    yield pubSub.releaseSeat(action.payload)
}

function* listenGetLibp2p() {
    yield takeEvery(SeatAction.GET_LIB_P2P, handleGetLibp2p)
}

function* listenRequiresSynchronization() {
    yield takeEvery(SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST, handleRequiresSynchronization)
}

function* listenTakeSeat() {
    yield takeEvery(SeatAction.TAKE_SEAT_REQUEST, handleTakeSeat)
}

function* listenReleaseSeat() {
    yield takeEvery(SeatAction.RELEASE_SEAT_REQUEST, handleReleaseSeat)
}

export function* seatSaga() {
    yield all([fork(listenGetLibp2p), fork(listenRequiresSynchronization), fork(listenTakeSeat), fork(listenReleaseSeat)])
}