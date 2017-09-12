import { Controller as SuperController } from '../../__share/controller/index'
import React from 'react'
import {
  render
} from 'react-dom'

// redux
import {
  createStore,
  applyMiddleware
} from 'redux'
// react-redux
import {
  Provider
} from 'react-redux'
import reducer from '../reducer/index'

import middlewareLogger from '../util/middlewareLogger'

import {
  FETCH_JQUERY
} from '../model/index'

export class Controller extends SuperController{
  fetchJquery = () => {

    FETCH_JQUERY()
      .then(response => response.text())
      .then(text => alert(`Fetch jQuery successfully! 
      
      ${text}
      `))
  }

  init(App) {
    window.reduxStore = createStore(reducer, applyMiddleware(middlewareLogger))

    render(
      <Provider store={reduxStore}>
        <App />
      </Provider>,
      document.getElementById('app')
    )

  }
}



export default new Controller()

