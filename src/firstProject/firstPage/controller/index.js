import { Controller as SuperController } from '../../share/controller/index'
import Inferno, { render } from 'inferno'
// redux
import {
  createStore,
  applyMiddleware
} from 'redux'
// inferno-redux
import {
  Provider
} from 'inferno-redux'
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

