import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getNumber,
  getFontSize
} from '../selector/index'
import action from '../action/index'
import controller from '../controller/index'

const {
  fetchJquery 
} = controller


class App extends Component {
  onAddClick = (e) => {
    this.props.addNumber()
    this.props.addFontSize()
  }

  onReduceClick = (e) => {
    this.props.reduceNumber()
    this.props.reduceFontSize()
  }

  onFetchJqueryClick = (e) => {
    this.props.fetchJquery()
  }

  render() {
    const {
      number,
      fontSize
    } = this.props

    return (
      <div style={{
        padding: '10px',
        textAlign: 'center',
        color: 'blue'
      }}>
        <div>
          <button onClick={this.onFetchJqueryClick}>Fetch jQuery.js</button>
        </div>
        <br />
        <div>
          <button onClick={this.onReduceClick}>-</button>
          &nbsp;&nbsp;
        <button onClick={this.onAddClick}>+</button>
        </div>



        <h1>
          <span style={{
            fontSize: `${fontSize > 0 ? fontSize : -1 * fontSize}px`
          }}>{number}</span>
        </h1>
      </div>
    )
  }
}



export default connect(
  (state, ownProps) => {
    return {
      number: getNumber(),
      fontSize: getFontSize()
    }
  },
  (dispatch, ownProps) => {
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
      fetchJquery
    }
  },
)(App)