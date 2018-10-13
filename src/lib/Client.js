const Discord = require('discord.js')

class BirdsClient extends Discord.Client {
  /**
   * Constructs the BirdsClient.
   * @param {BirdsClientOptions} [options={}]
   */
  constructor(options = {}) {
    super(options)
    this.options = options
  }

  /**
   * Use this to login to Discord with your bot.
   *
   * @since 0.0.1
   * @param {string} token Your bot token
   * @returns {Promise<string>}
   */
  async login(token) {
    return await super.login(token)
  }

  /**
   * Returns rounded ping.
   *
   * @since 0.0.1
   * @readonly
   * @type {number}
   */
  get roundedPing() {
    return Math.round(super.ping)
  }
}

module.exports = BirdsClient
