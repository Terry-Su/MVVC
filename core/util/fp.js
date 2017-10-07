module.exports = {
  compose() {
    const fns = Array.apply(null,arguments)
    return params => {
      let result = null

      fns.map(fn => {
        result = result || params
        result = fn(result)
      })

      return result
    }
    
  }
}