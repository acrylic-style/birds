const { Client, Logger } = require("../src/")
const logger = Logger.getLogger("test")
const language_codes = [
  "en_US",
  "ja_JP",
]
const client = new Client({ language: "ja_JP", language_extension: ".json", language_codes: language_codes, prefix: "t:" })

client.on("ready", () => {
  logger.info("Ok, logged in as: ", client.user.username)
  logger.info("Token:", client.token)
  logger.info("rawPing:", client.ping)
  logger.info("roundedPing:", client.roundedPing)
})

client.on("message", async msg => {
  if (msg.content === "ping") {
    logger.info("rawPing:", msg.client.ping)
    logger.info("roundedPing:", client.roundedPing)
  }
})

client.on("birdsError", e => {
  logger.error(e)
})

client.login("<censored>")
