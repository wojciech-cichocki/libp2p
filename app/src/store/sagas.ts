import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {SeatAction} from "./types";
import getOrCreateLibp2p from "../p2p-node/libp2p";
import getOrCreatePeerId from "../p2p-node/peer-id";

// function* handleRequiresSynchronizationRequest() {
// }

function* handleInitLibp2p() {
    const peerId: string = yield getOrCreatePeerId();
    console.log(peerId)
    yield getOrCreateLibp2p(peerId);
}

function* watchInitlibp2p() {
    yield takeEvery(SeatAction.INIT_LIB_P2P, handleInitLibp2p)
}

// function* watchRequiresSynchronizationRequest() {
//     yield takeEvery(SeatAction.REQUIRES_SYNCHRONIZATION_REQUEST, handleRequiresSynchronizationRequest)
// }

export function* seatSaga() {
    yield all([fork(watchInitlibp2p)])
    // yield all([watchInitlibp2p])
}