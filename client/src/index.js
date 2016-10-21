import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router'
import App from './App'

//import 'bootstrap/dist/css/bootstrap.css'
//import './css-themes/default/bootstrap.css'
//import './css-themes/flatly/bootstrap.css'
//import './css-themes/paper/bootstrap.css'
//import './css-themes/yeti/bootstrap.css'

import './index.css'

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
),
  document.getElementById('root')
)
