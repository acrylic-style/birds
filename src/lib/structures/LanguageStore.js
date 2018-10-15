const { loadModule, mergeObject } = require("../../util/Util")
const Store = require("./Store")

class LanguageStore extends Store {

  /**
   * Constructs LanguageStore.
   *
   * @since 0.0.1
   * @param {string} path Expected language dir
   * @param {Array} language_codes Language codes
   * @param {string} extension File extension(Don't forgot a dot). Common extensions: json, yml
   */
  constructor(path, language_codes, extension) {
    super()

    /**
     * Get languages.
     *
     * @since 0.0.1
     * @private
     * @type {object} { LanguageCode: any }
     */
    this._language = {}
    try {
      language_codes.forEach(code => {
        mergeObject(this._language, { [code]: loadModule(path + "/" + code + extension) })
        mergeObject(this._language[code], mergeObject(this._language["en_US"], this._language[code]))
      })
    } catch (e) {
      /**
       * Provides Error if is there found error[s].
       *
       * @type {undefined|Error}
       */
      this.err = e
      return
    }
    return this.language
  }

  /**
   * Get languages.
   *
   * @since 0.0.1
   * @readonly
   * @returns {object} { LanguageCode: any }
   */
  get language() {
    return this._language
  }
}

module.exports = LanguageStore
