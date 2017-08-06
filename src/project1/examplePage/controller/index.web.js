import Controller from '../../share/controller/index.web.js'
import Inferno from 'inferno'
import { render } from 'inferno'

// redux
import {
  createStore
} from 'redux'


import Foo from '../component/Foo'

render(
  <Foo />,
  document.getElementById('app')
)
