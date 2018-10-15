const { Command } = require("../../src/index")

module.exports = class extends Command {
  constructor() {
    super("ping")
  }

  async run(message, lang) {
    message.channel.send(lang.pong)
  }
}
