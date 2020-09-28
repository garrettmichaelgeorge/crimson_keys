function rangeFrom(start, end) {
  // https://javascript.info/generators#using-generators-for-iterables
  return {
    from: start,
    to: end,

    *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
      for(let value = this.from; value <= this.to; value++) {
        yield value
      }
    }
  }
}

export default rangeFrom
