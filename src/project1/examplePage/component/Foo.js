import Inferno from 'inferno'
import {
  connect
} from 'inferno-redux'


class Foo extends Inferno {
  render() {
    return (
      <div>
        foo
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(Foo)