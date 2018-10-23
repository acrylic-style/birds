const InvalidArgumentError = require("../error/InvalidArgumentError")

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

  /**
   * Convert language
   * @param {string} lang
   * @throws {InvalidArgumentError} If not valid language provided
   */
  static lang_convert(lang) {
    const languages = {
      "af": "af_ZA",
      "ar": "ar_SA",
      "ca": "ca_ES",
      "cs": "cs_CZ",
      "da": "da_DK",
      "de": "de_DE",
      "el": "el_GR",
      "en": "en_US",
      "es": "es_ES",
      "fi": "fi_FI",
      "fr": "fr_FR",
      "he": "he_IL",
      "hu": "hu_HU",
      "it": "it_IT",
      "ja": "ja_JP",
      "ko": "ko_KR",
      "nl": "nl_NL",
      "no": "no_NO",
      "pl": "pl_PL",
      "pt": "pt_PT",
      "ro": "ro_RO",
      "ru": "ru_RU",
      "sr": "sr_SP",
      "sv": "sv_SE",
      "tr": "tr_TR",
      "uk": "uk_UA",
      "vi": "vi_VN",
      "zh": "zh_CN",
      "lol": "lol_US",
      "pt2": "pt_BR",
      "zh2": "zh_TW",
    }
    if (languages[lang]) return languages[lang]
    const values = Object.values(languages)
    if (values.includes(lang)) return lang
    throw new InvalidArgumentError(`Can't convert language from ${lang}`)
  }
}

module.exports = Util
