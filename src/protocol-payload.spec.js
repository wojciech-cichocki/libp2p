const uint8arrayFromString = require('uint8arrays/from-string')
const assert = require('assert')

const {SeatsUpdate, Seat} = require('./protocol-payload')

describe('Protocol Payload Test', () => {
    context('First test case', () => {
        const id = 1;
        const type = Seat.Type.FREE;
        const peerId = 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'
        const created = Date.now()
        let seatPayload

        before('should encode Seat', () => {
            seatPayload = Seat.encode({
                id: id,
                type: type,
                peerId: uint8arrayFromString(peerId),
                created: created
            })
        })

        it('ok' ,  () => {
            assert.ok(true)
        })
    })
})