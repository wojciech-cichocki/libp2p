import PeerId from 'peer-id'

async function getOrCreatePeerId(): Promise<PeerId> {
    let peerId
    try {
        peerId = JSON.parse(localStorage.getItem('peerId') as string)
        peerId = await PeerId.createFromJSON(peerId)
    } catch (err) {
        peerId = await PeerId.create()
        localStorage.setItem('peerId', JSON.stringify(peerId.toJSON()))
    }

    return peerId
}

export default getOrCreatePeerId