const uint8arrayFromString = require('uint8arrays/from-string')
const uint8arrayToString = require('uint8arrays/to-string')
const assert = require('assert')

const {SeatsUpdate, Seat} = require('./protocol-payload')

describe('Protocol Payload Test', () => {
    context('First test case', () => {
        const expectedId = 1;
        const expectedType = Seat.Type.FREE;
        const expectedPeerId = 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'
        const expectedCreated = Date.now()
        let seatPayload

        before('should encode Seat', () => {
            seatPayload = Seat.encode({
                id: expectedId,
                type: expectedType,
                peerId: uint8arrayFromString(expectedPeerId),
                created: expectedCreated
            })
        })

        it('should decode Seat' ,  () => {
            const {id, type, peerId, created } = Seat.decode(seatPayload);

            assert.strictEqual(expectedId, id)
            assert.strictEqual(expectedType, type)
            assert.strictEqual(expectedPeerId, uint8arrayToString(peerId))
            assert.strictEqual(expectedCreated, created)
        })
    })
})