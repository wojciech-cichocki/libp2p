import React, {useState, useEffect} from 'react'
import createLibp2p from "./libp2p/libp2p";


export default function App() {
    const [libp2p, setLibp2p] = useState()

    const initLibp2p =async  () => {
        if (!libp2p) {
            const node = await createLibp2p()
        }
    }

    useEffect(() => {
        initLibp2p()
    })

    return (<div>Hello world!</div>)
}