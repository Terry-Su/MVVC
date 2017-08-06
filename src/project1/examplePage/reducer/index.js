const defaultState = {
  foo: {
    number: 0,
    fontSize: 20
  }
}

export default function (state = defaultState, action) {
  return {
    foo: foo(state.foo, action)
  }
}

function foo(state, action) {
  switch (action.type) {
    case 'ADD_FONT_SIZE':
      return {
        ...state,
        fontSize: state.fontSize + action.value
      }
    case 'ADD_NUMBER':
      return {
        ...state,
        number: state.number + action.number
      }
    case 'REDUCE_FONT_SIZE':
      return {
        ...state,
        fontSize: state.fontSize - action.value
      }
    case 'REDUCE_NUMBER':
      return {
        ...state,
        number: state.number - action.number
      }
    default:
      return state
  }
}