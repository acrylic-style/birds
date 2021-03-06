const Discord = require("discord.js")
const { Permissions } = Discord

class Command {
  /**
   * Construct this Command Instance.
   *
   * If not extend this Class, your file will be ignored.
   * @param {string} name Command name
   * @param {Object} options alias, args, permission(number)
   * @constructor
   */
  constructor(name, options = {}) {
    this.name = name

    options = Object.assign({
      alias: [],
      args: [],
      permission: 0,
    }, options)

    this.alias = options.alias
    this.args = options.args
    this.permission = new Permissions(options.permission).freeze()
  }

  /**
   * @abstract
   */
  async run() { }

  /**
   * @abstract
   * @param {Discord.GuildMember} member
   */
  hasPermission(member) {
    return member.hasPermission(this.permission.bitfield)
  }
}

module.exports = Command
