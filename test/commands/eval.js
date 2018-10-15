const { Command } = require("../../src/index")

module.exports = class extends Command {
  constructor() {
    super("eval", {args: ["<Code>"],permission: 8})
  }

  async run(message, lang, args) {
    let result = ""
    try {
      result = eval(args.slice(1).join(" "))
    } catch (e) {
      result = e
    }
    message.channel.send(lang.eval + result)
  }
}
