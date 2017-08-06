import Controller from '../../share/controller/index.web.js'
import Inferno from 'inferno'
import { render } from 'inferno'

// redux
import {
  createStore,
  applyMiddleware
} from 'redux'
import {
  Provider
} from 'inferno-redux'
import foo from '../reducer/index'

// component
import Foo from '../component/Foo'


const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

window.reduxStore = createStore(foo, applyMiddleware(logger))

render(
  <Provider store={reduxStore}>
    <Foo />
  </Provider>,
  document.getElementById('app')
)


export function getStore() {
  return reduxStore
}