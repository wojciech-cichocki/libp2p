const assert = require('assert')

const { Seat} = require('./protocol.model')
const {encodeSeat, decodeSeat, encodeCurrentState, decodeCurrentState} = require('./protocol.utility')

describe('Protocol Payload Test', () => {
    let expectedCurrentState = []

    context('Taken seat test case', () => {
        const expectedSeat = {
            id: 1,
            type: Seat.Type.TAKEN,
            peerId: 'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d',
            timestamp: Date.now()
        }
        let encodedSeat

        before('should encode Seat', () => {
            expectedCurrentState.push(expectedSeat)
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
            timestamp: Date.now()
        }
        let encodedSeat

        before('should encode Seat', () => {
            expectedCurrentState.push(expectedSeat)
            encodedSeat = encodeSeat(expectedSeat)
        })

        it('should decode Seat', () => {
            isSeatValidDecoded(expectedSeat, decodeSeat(encodedSeat))
        })
    })

    after('SeatsUpdate Test', () => {
        const encodedCurrentState = encodeCurrentState(expectedCurrentState[0], expectedCurrentState[1])
        const {firstSeat, secondSeat} = decodeCurrentState(encodedCurrentState)

        isSeatValidDecoded(expectedCurrentState[0], firstSeat)
        isSeatValidDecoded(expectedCurrentState[1], secondSeat)
    })

    const isSeatValidDecoded = (expectedSeat, decodedSeat) => {
        const {id: expectedId, type: expectedType, peerId: expectedPeerId, timestamp: expectedTimestamp} = expectedSeat
        const {id: decodedId, type: decodedType, peerId: decodedPeerId, timestamp: decodedTimestamp} = decodedSeat

        assert.strictEqual(expectedId, decodedId)
        assert.strictEqual(expectedType, decodedType)
        assert.strictEqual(expectedTimestamp, decodedTimestamp)

        if (expectedPeerId !== undefined) {
            assert.strictEqual(expectedPeerId, decodedPeerId)
        }
    }
})