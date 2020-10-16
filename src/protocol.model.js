const protons = require('protons')

const {CurrentState, Seat, TakeSeatRequest} = protons(`
    message CurrentState {
        required Seat firstSeat = 1;
        required Seat secondSeat = 2;
    }
    
    message Seat {
          enum Type {
            FREE = 0;
            TAKEN = 1;
          }
    
         required int64 id = 1;
         required Type type = 2;
         optional bytes peerId = 3;
         required int64 timestamp = 4;
    }
    
    message TakeSeatRequest {
        required int64 id = 1;
        required int64 timestamp = 2;
    }
`)

module.exports = {
    CurrentState,
    Seat,
    TakeSeatRequest
}