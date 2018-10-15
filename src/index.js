module.exports = {
  Client: require("./lib/Client"),

  Command: require("./lib/structures/Command"),
  CommandStore: require("./lib/structures/CommandStore"),
  LanguageStore: require("./lib/structures/LanguageStore"),
  Store: require("./lib/structures/Store"),

  constants: require("./util/constants"),
  Logger: require("./util/logger"),
  Util: require("./util/Util"),
}
