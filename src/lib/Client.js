const path = require("path")

const Util = require("../util/Util")
const Constants = require("../util/constants")

const InvalidArgumentError = require("../error/InvalidArgumentError")

const Discord = require("discord.js")
const CommandStore = require("./structures/CommandStore")
const LanguageStore = require("./structures/LanguageStore")

/**
 * @extends external:Client
 */
class BirdsClient extends Discord.Client {
  /**
   * @typedef {external:ClientOptions} BirdsClientOptions
   * @property {string}   [language="en_US"]
   * @property {string}   [language_extension=".json"]
   * @property {Array}    [language_codes=["en_US"]]
   * @property {string}   [prefix="!"]
   * @property {boolean}  [prefixCaseInsensitive=true]
   * @property {string}   [ownerID=undefined]
   * @property {object}   [custom_args={}]
   */

  /**
   * Constructs the BirdsClient.
   * @param {BirdsClientOptions} [options={}]
   */
  constructor(options = {}) {
    super(options)
    this.options = Util.mergeObject(Constants.DEFAULTS.CLIENT, options)
    /**
     * @since 0.0.1
     * @name BirdsClient#options
     * @type {BirdsClientOptions}
     */
    this.rootDir = path.resolve(".")
    this.commands = (new CommandStore(this.rootDir + "/commands/")).commands

    if (!this.options.language_codes.includes(this.options.language)) throw new InvalidArgumentError("Provided Language Codes not contains selected language.\n(It should be xx_XX.)")
    this.languages = (new LanguageStore(this.rootDir + "/languages/", this.options.language_codes, this.options.language_extension))[this.options.language]

    const language_codes = [
      "en_US",
      "ja_JP",
    ]
    this.core_languages = (new LanguageStore(__dirname + "/../lang/", language_codes, ".json"))[this.options.language]

    this.on("message", message => {
      if (message.content.startsWith(this.options.prefix)) {
        const args = message.content.replace(this.options.prefix, "").split(" ")
        console.log(`${message.author.tag} sent command: ${message.content} (cmd: ${args[0]})`)
        if (this.commands[args[0]]) {
          this.commands[args[0]].run(message, this.languages, args, this.options.custom_args).catch(error => {
            this.emit("birdsError", error)
            message.channel.send(this.core_languages["error_occurred"])
            return false
          })
        } else {
          message.channel.send(this.core_languages["unknown_command"])
        }
      }
    })
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
