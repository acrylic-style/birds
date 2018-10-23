const path = require("path")

const Util = require("../util/Util")
const Constants = require("../util/constants")

const InvalidArgumentError = require("../error/InvalidArgumentError")

const Discord = require("discord.js")
const CommandStore = require("./structures/CommandStore")
const LanguageStore = require("./structures/LanguageStore")

/**
 * @extends external:Discord.Client
 */
class Client extends Discord.Client {
  /**
   * @typedef {external:ClientOptions} BirdsClientOptions
   * @property {string}   [language="en_US"]
   * @property {string}   [language_extension=".json"]
   * @property {Array}    [language_codes=["en_US"]]
   * @property {string}   [prefix="!"]
   * @property {boolean}  [prefixCaseInsensitive=true]
   * @property {string}   [ownerID=undefined]
   * @property {object}   [custom_args={}]
   * @property {string}   [root_dir=""]
   */

  /**
   * Constructs the BirdsClient.
   * @param {BirdsClientOptions} [options={}]
   */
  constructor(options = {}) {
    super(options)
    /**
     * @since 0.0.1
     * @name BirdsClient#options
     * @type {BirdsClientOptions}
     */
    this.options = Util.mergeObject(Constants.DEFAULTS.CLIENT, options) // something went wrong
    this.rootDir = path.resolve("./" + (options.root_dir || ""))
    this.commands = (new CommandStore(this.rootDir + "/commands/")).commands
    this.languages = (new LanguageStore(this.rootDir + "/languages/", this.options.language_codes, this.options.language_extension))[this.options.language]
    try {
      this.language = Util.lang_convert(this.options.language)
    } catch (e) {
      this.emit("birdsError", e)
    }

    if (!this.options.language_codes.includes(this.options.language)) throw new InvalidArgumentError("Provided Language Codes not contains selected language.\n(It should be xx_XX.)")

    const available_language_codes = [
      "en_US",
      "ja_JP",
    ]
    this.core_languages = (new LanguageStore(__dirname + "/../lang/", available_language_codes, ".json"))[this.language]

    this.on("message", message => {
      if (message.content.startsWith(this.options.prefix)) {
        const args = message.content.split(" ")
        console.log(`${message.author.tag} sent command: ${message.content} (cmd: ${args[0]})`)
        if (this.commands[args[0]]) {
          this.commands[args[0]].run(message, this.languages, args, this.options.custom_args, this.options.custom_args2).catch(error => {
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
   * Configure custom options.
   *
   * @since 0.0.1
   * @param {object} args arguments(object)
   */
  config(args) {
    this.options.custom_args2 = args
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

module.exports = Client
