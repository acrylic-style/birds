const IllegalStateError = require("../../error/IllegalStateError")
const Command = require("./Command")
const fs = require("fs")

class CommandStore {
  constructor(path) {
    const commands = {}

    const files = fs.readdirSync(path)

    function setCommand(file, reload) {
      if (reload) delete require.cache[require.resolve(`${__dirname}/commands/${file}`)]
      const rawcommand = require(`${__dirname}/commands/${file}`)
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

    for (const file of files) if (file.endsWith(".js")) setCommand(file)

    return {
      commands,
      load(file) {
        setCommand(file, true)
      },
    }
  }
}

module.exports = CommandStore
