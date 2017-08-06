import { createActions } from './actionCreator'

const actions = {
  ADD_FONT_SIZE(value) {
    return {
      value
    }
  },

  ADD_NUMBER(number) {
    return {
      number
    }
  },

  REDUCE_FONT_SIZE(value) {
    return {
      value
    }
  },

  REDUCE_NUMBER(number) {
    return {
      number
    }
  },
}


export default createActions(actions)