import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import "bootstrap/dist/css/bootstrap.min.css"
import 'animate.css';
import "./main.css"

import App from './app';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App></App>
  </StrictMode>
)
