const IllegalStateError = require("../../error/IllegalStateError")
const Command = require("./Command")
const Store = require("./Store")
const fs = require("fs")

class CommandStore extends Store {
  /**
   * @since 0.0.1
   * @param {string} path
   */
  constructor(path) {
    super()
    const commands = {}

    const files = fs.readdirSync(path)

    /**
     * @private
     * @since 0.0.1
     * @param {string} file
     * @param {boolean} reload
     */
    this.setCommand = (file, reload) => {
      if (reload) delete require.cache[require.resolve(`${path}/${file}`)]
      const rawcommand = require(`${path}/${file}`)
      if (typeof rawcommand != "function") return
      const command = new rawcommand()
      if (rawcommand instanceof Command) return
      commands[command.name] = command
      for (const alias of command.alias) {
        if (commands[alias] && !reload)
          throw new IllegalStateError(`The ${command.name} alias ${alias} is already used.`)
        commands[alias] = command
      }
    }

    for (const file of files) if (file.endsWith(".js")) this.setCommand(file)
    /**
     * @private
     */
    this.commands_get = commands

    return {
      commands,
      load(file) {
        this.setCommand(file, true)
      },
    }
  }

  /**
   * Get Commands.
   *
   * @since 0.0.1
   * @readonly
   * @type {object}
   */
  get commands() {
    return this.commands_get
  }
}

module.exports = CommandStore
