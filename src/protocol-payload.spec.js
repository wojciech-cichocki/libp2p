const uint8arrayFromString = require('uint8arrays/from-string')
const uint8arrayToString = require('uint8arrays/to-string')
const assert = require('assert')

const {SeatsUpdate, Seat} = require('./protocol-payload')

describe('Protocol Payload Test', () => {
    let expectedSeatsUpdate = []

    context('Taken seat test case', () => {
        const expectedSeat = {
            id: 1,
            type: Seat.Type.TAKEN,
            peerId: 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d',
            created: Date.now()
        }
        let encodedSeat

        before('should encode Seat', () => {
            const payload = seatToBytes(expectedSeat);

            encodedSeat = Seat.encode(payload)
            expectedSeatsUpdate.push(payload)
        })

        it('should decode Seat', () => {
            isSeatValidDecoded(expectedSeat, Seat.decode(encodedSeat))
        })
    })

    context('Free seat test case', () => {
        const expectedId = 2;
        const expectedType = Seat.Type.FREE;
        const expectedCreated = Date.now()
        let encodedSeat

        before('should encode Seat', () => {
            const payload = {
                id: expectedId,
                type: expectedType,
                created: expectedCreated
            }
            expectedSeatsUpdate.push(payload)

            encodedSeat = Seat.encode(payload)
        })

        it('should decode Seat', () => {
            const {id, type, created} = Seat.decode(encodedSeat);

            assert.strictEqual(expectedId, id)
            assert.strictEqual(expectedType, type)
            assert.strictEqual(expectedCreated, created)
        })
    })

    const seatToBytes = (seat) => {
        const payload = Object.assign({}, seat);
        if (payload.peerId !== null) {
            return Object.assign(payload, {peerId: uint8arrayFromString(payload.peerId)})
        }
    }

    const isSeatValidDecoded = (expectedSeat, decodedSeat) => {
        const {id: expectedId, type: expectedType, peerId: expectedPeerId, created: expectedCreated} = expectedSeat
        const {id: decodedId, type: decodedType, peerId: decodedPeerId, created: decodedCreated} = decodedSeat

        assert.strictEqual(expectedId, decodedId)
        assert.strictEqual(expectedType, decodedType)
        assert.strictEqual(expectedCreated, decodedCreated)

        if (expectedPeerId !== null) {
            assert.strictEqual(expectedPeerId, uint8arrayToString(decodedPeerId))
        }
    }
})