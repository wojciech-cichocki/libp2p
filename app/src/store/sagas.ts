import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {SeatAction} from "./types";
import {getOrCreatePubSub, IPubSub} from "../p2p-node/pub-sub";

function* handleRequiresSynchronization() {
    console.log('handleRequiresSynchronization')
    const pubSub: IPubSub = yield getOrCreatePubSub();
    yield pubSub.requiresSynchronization()
}

function* handleInitLibp2p() {
    yield getOrCreatePubSub()
}

function* listenInitlibp2p() {
    yield takeEvery(SeatAction.INIT_LIB_P2P, handleInitLibp2p)
}

function* listenRequiresSynchronization() {
    yield takeEvery(SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST, handleRequiresSynchronization)
}

export function* seatSaga() {
    yield all([fork(listenInitlibp2p), fork(listenRequiresSynchronization)])
}