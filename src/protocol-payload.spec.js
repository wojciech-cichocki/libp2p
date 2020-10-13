const uint8arrayFromString = require('uint8arrays/from-string')
const assert = require('assert')

const {SeatsUpdate, Seat} = require('./protocol-payload')

describe('Protocol Payload Test', () => {
    let seatPayload

    before('should encode Seat', () => {
        seatPayload = Seat.encode({
            id: 1,
            type: Seat.Type.FREE,
            peerId: uint8arrayFromString('QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'),
            created: Date.now()
        })
    })

    it('ok' ,  () => {
        assert.ok(true)
    })
})