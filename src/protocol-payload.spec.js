const uint8arrayFromString = require('uint8arrays/from-string')
const uint8arrayToString = require('uint8arrays/to-string')
const assert = require('assert')

const {SeatsUpdate, Seat} = require('./protocol-payload')

describe('Protocol Payload Test', () => {
    let expectedSeatsUpdate = []

    context('Taken seat test case', () => {
        const expectedId = 1;
        const expectedType = Seat.Type.TAKEN;
        const expectedPeerId = 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'
        const expectedCreated = Date.now()
        let seatPayload

        before('should encode Seat', () => {
            const payload = {
                id: expectedId,
                type: expectedType,
                peerId: uint8arrayFromString(expectedPeerId),
                created: expectedCreated
            }
            expectedSeatsUpdate.push(payload)

            seatPayload = Seat.encode(payload)
        })

        it('should decode Seat' ,  () => {
            const {id, type, peerId, created } = Seat.decode(seatPayload);

            assert.strictEqual(expectedId, id)
            assert.strictEqual(expectedType, type)
            assert.strictEqual(expectedPeerId, uint8arrayToString(peerId))
            assert.strictEqual(expectedCreated, created)
        })
    })

    context('Free seat test case', () => {
        const expectedId = 2;
        const expectedType = Seat.Type.FREE;
        const expectedCreated = Date.now()
        let seatPayload

        before('should encode Seat', () => {
            const payload = {
                id: expectedId,
                type: expectedType,
                created: expectedCreated
            }
            expectedSeatsUpdate.push(payload)

            seatPayload = Seat.encode(payload)
        })

        it('should decode Seat' ,  () => {
            const {id, type, created } = Seat.decode(seatPayload);

            assert.strictEqual(expectedId, id)
            assert.strictEqual(expectedType, type)
            assert.strictEqual(expectedCreated, created)
        })
    })
})