import React, {useState, useEffect} from 'react'
import {getOrCreatePeerId} from './libp2p/peer-id'


export default function App({createLibp2p}
) {
    const [peerId, setPeerId] = useState(null)
    const [libp2p, setLibp2p] = useState(null)


    useEffect(() => {
        // If we don't have a PeerId, let's get or create it
        // This will attempt to leverage localStorage so we can reuse our key
        if (!peerId) {
            console.info('Getting our PeerId')
            getOrCreatePeerId().then(setPeerId)
            return
        }

        // If the libp2p instance is not created, create it with our PeerId instance
        if (!libp2p) {
            ;(async () => {
                console.info('Creating our Libp2p instance')
                const node = await createLibp2p(peerId)
                setLibp2p(node)
            })()
        }
    })

    return (
        <div>
            {peerId ? (peerId._idB58String) : ('Not initialized')}
        </div>
    )
}