import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import {
  getNumber,
  getFontSize
} from '../selector/index'
import action from '../action/index'



class Foo extends Component{
  onAddClick = (e) => {
    this.props.addNumber()
    this.props.addFontSize()
    console.log(`Button " ${e.target.innerHTML} "  clicked!`)    
  }

  onReduceClick = (e) => {
    this.props.reduceNumber()
    this.props.reduceFontSize()
    console.log(`Button " ${e.target.innerHTML} "   clicked!`)    
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
        color: '#0ea9c7'
      }}>
        <button onClick={this.onReduceClick}>-</button>
        &nbsp;&nbsp;
        <button onClick={this.onAddClick}>+</button>

        <h1>
          <span style={{
            fontSize: `${fontSize > 0 ? fontSize : -1 * fontSize}px`
          }}>{number}</span>
        </h1>    
      </div>
    )
  }
}


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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foo)