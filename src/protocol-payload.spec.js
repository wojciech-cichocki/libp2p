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
        const expectedSeat = {
            id: 2,
            type: Seat.Type.FREE,
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

    const seatToBytes = (seat) => {
        const payload = Object.assign({}, seat);
        if (payload.peerId !== undefined) {
            return Object.assign(payload, {peerId: uint8arrayFromString(payload.peerId)})
        }
        return payload
    }

    const isSeatValidDecoded = (expectedSeat, decodedSeat) => {
        const {id: expectedId, type: expectedType, peerId: expectedPeerId, created: expectedCreated} = expectedSeat
        const {id: decodedId, type: decodedType, peerId: decodedPeerId, created: decodedCreated} = decodedSeat

        assert.strictEqual(expectedId, decodedId)
        assert.strictEqual(expectedType, decodedType)
        assert.strictEqual(expectedCreated, decodedCreated)

        if (expectedPeerId !== undefined) {
            assert.strictEqual(expectedPeerId, uint8arrayToString(decodedPeerId))
        }
    }
})