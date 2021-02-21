const uint8arrayToString = require('uint8arrays/to-string');

const { Message } = require('./protocol.model');

const encodeRequiresSynchronization = () => {
  return Message.encode({
    type: Message.Type.REQUIRES_SYNCHRONIZATION,
  });
};

const decodeMessage = (encodedMessage) => {
  return Message.decode(encodedMessage);
};

const encodeTakeSeatRequest = ({ id, timestamp }) => {
  return Message.encode({
    type: Message.Type.TAKE_SEAT_REQUEST,
    takeSeatRequest: {
      id,
      timestamp,
    },
  });
};

const decodeTakeSeatRequest = (encodedTakeSeatRequest) => {
  const { takeSeatRequest } = Message.decode(encodedTakeSeatRequest);
  return takeSeatRequest;
};

const encodeReleaseSeatRequest = ({ id, timestamp }) => {
  return Message.encode({
    type: Message.Type.RELEASE_SEAT_REQUEST,
    releaseSeatRequest: {
      id,
      timestamp,
    },
  });
};

const decodeReleaseSeatRequest = (encodedReleaseSeatRequest) => {
  const { releaseSeatRequest } = Message.decode(encodedReleaseSeatRequest);
  return releaseSeatRequest;
};

const decodeCurrentState = (encodedCurrentState) => {
  const { currentState: decodedCurrentState } = Message.decode(
    encodedCurrentState
  );

  return {
    firstSeat: seatFromBytes(decodedCurrentState.firstSeat),
    secondSeat: seatFromBytes(decodedCurrentState.secondSeat),
  };
};

const seatFromBytes = (seat) => {
  return transformMsg(seat, uint8arrayToString);
};

const transformMsg = (seat, peerIdConverter) => {
  const output = Object.assign({}, seat);
  if (output.peerId) {
    return Object.assign(output, { peerId: peerIdConverter(output.peerId) });
  }
  delete output.peerId;
  return output;
};

module.exports = {
  decodeCurrentState,
  encodeTakeSeatRequest,
  decodeTakeSeatRequest,
  encodeReleaseSeatRequest,
  decodeReleaseSeatRequest,
  decodeMessage,
  encodeRequiresSynchronization,
};
