import { connect } from 'inferno-redux'
import {
  getNumber,
  getFontSize
} from '../selector/index'
import action from '../action/index'
import {
  FETCH_JQUERY
} from '../model/index'
import Foo from './Foo'

function mapStateToProps(state) {
  return {
    number: getNumber(),
    fontSize: getFontSize() 
  }
}

function mapDispatchToProps(dispatch) {
  return {
      addNumber() {
        action.ADD_NUMBER(1)
      },
      addFontSize() {
        action.ADD_FONT_SIZE(5)
      }, 
      reduceFontSize() {
        action.REDUCE_FONT_SIZE(5)
      },
      reduceNumber() {
        action.REDUCE_NUMBER(1)
      },
      fetchJquery() {
        FETCH_JQUERY()
        .then(response => response.text())
        .then(text => alert(`Fetch jQuery successfully! 
        
        ${text}
        `))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foo)