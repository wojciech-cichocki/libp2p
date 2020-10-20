import 'regenerator-runtime/runtime.js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import createLibp2p from "./libp2p/libp2p";

ReactDOM.render(<App createLibp2p={createLibp2p}/>, document.getElementById('root'))