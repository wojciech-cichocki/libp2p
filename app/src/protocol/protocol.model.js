const protons = require('protons')

const {Message} = protons(`
    message Message {
        enum Type {
            CURRENT_STATE = 0;
            TAKE_SEAT_REQUEST = 1;
            RELEASE_SEAT_REQUEST = 2;
            REQUIRES_SYNCHRONIZATION = 3;
        }
    
        required Type type = 1;
        optional CurrentState currentState = 2;
        optional TakeSeatRequest takeSeatRequest = 3;
        optional ReleaseSeatRequest releaseSeatRequest = 4;
    }

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
    
    message ReleaseSeatRequest {
        required int64 id = 1;
        required int64 timestamp = 2;
    }
`)

module.exports = {
    Message
}