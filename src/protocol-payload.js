const protons = require('protons')

const {SeatsUpdate, Seat} = protons(`
    message SeatsUpdate {
        required Seat firstSeat = 1;
        required Seat secondSeat = 2;
    }
    
    message Seat {
          enum Type {
            FREE = 0;
            TAKEN = 1;
          }
    
         required bytes id = 1;
         required Type type = 2;
         optional bytes peerId = 3;
         required int64 created = 4;
    }
`)

module.exports = {
    SeatsUpdate,
    Seat
}