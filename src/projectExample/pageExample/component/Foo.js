import Inferno from 'inferno'
import Component from 'inferno-component'

export default class Foo extends Component {
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
        <br/>
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
