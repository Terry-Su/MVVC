const { compose } = require('../fp.js')

describe("fp", function () {
  it("compose", function () {
    const add1 = x => x + 1
    const mul5 = x => x * 5
    
    expect(
      compose(mul5, add1)(2)
    ).toBe(11)
  });
});