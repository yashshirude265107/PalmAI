/**
 * A tiny stand-in for a Mongoose Query object. Supports the same chained
 * calls used in the controllers (.sort().skip().limit()) and is "thenable"
 * so `await SomeModel.find(...)` still works without any controller changes.
 */
class ArrayQuery {
  constructor(results) {
    this.results = [...results];
  }

  sort(sortObj) {
    const [key, direction] = Object.entries(sortObj)[0];
    this.results.sort((a, b) => {
      if (a[key] === b[key]) return 0;
      const isGreater = a[key] > b[key];
      return direction === -1 ? (isGreater ? -1 : 1) : isGreater ? 1 : -1;
    });
    return this;
  }

  skip(n) {
    this.results = this.results.slice(n);
    return this;
  }

  limit(n) {
    this.results = this.results.slice(0, n);
    return this;
  }

  then(resolve, reject) {
    return Promise.resolve(this.results).then(resolve, reject);
  }
}

module.exports = ArrayQuery;
