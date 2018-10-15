class Util {
  /**
   * Merge a object.
   * {obj1} will be overwritten.
   * @param {object} obj1
   * @param {object} obj2
   * @returns {object} A merged object.
   */
  static mergeObject(obj1, obj2) {
    return Object.assign(obj1, obj2)
  }

  /**
   * Load a module with provided path.
   *
   * @param {string} path
   * @returns {any} 'require'd value or undefined if not found file
   */
  static loadModule(path) {
    try {
      return require(path)
    } catch (ignore) {
      return null
    }
  }
}

module.exports = Util
