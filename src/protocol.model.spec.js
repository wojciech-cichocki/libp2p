const assert = require('assert')

const { Seat} = require('./protocol.model')
const {encodeSeat, encodeUpdateSeats, decodeSeat, decodeUpdateSeats} = require('./protocol.utility')

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
            expectedSeatsUpdate.push(expectedSeat)
            encodedSeat = encodeSeat(expectedSeat)
        })

        it('should decode Seat', () => {
            isSeatValidDecoded(expectedSeat, decodeSeat(encodedSeat))
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
            expectedSeatsUpdate.push(expectedSeat)
            encodedSeat = encodeSeat(expectedSeat)
        })

        it('should decode Seat', () => {
            isSeatValidDecoded(expectedSeat, decodeSeat(encodedSeat))
        })
    })

    after('SeatsUpdate Test', () => {
        const encodedSeatsUpdate = encodeUpdateSeats(expectedSeatsUpdate[0], expectedSeatsUpdate[1])
        const {firstSeat, secondSeat} = decodeUpdateSeats(encodedSeatsUpdate)

        isSeatValidDecoded(expectedSeatsUpdate[0], firstSeat)
        isSeatValidDecoded(expectedSeatsUpdate[1], secondSeat)
    })

    const isSeatValidDecoded = (expectedSeat, decodedSeat) => {
        const {id: expectedId, type: expectedType, peerId: expectedPeerId, created: expectedCreated} = expectedSeat
        const {id: decodedId, type: decodedType, peerId: decodedPeerId, created: decodedCreated} = decodedSeat

        assert.strictEqual(expectedId, decodedId)
        assert.strictEqual(expectedType, decodedType)
        assert.strictEqual(expectedCreated, decodedCreated)

        if (expectedPeerId !== undefined) {
            assert.strictEqual(expectedPeerId, decodedPeerId)
        }
    }
})