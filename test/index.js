const { Client } = require("../src/")
const client = new Client()

client.on("ready", () => {
  console.log("Ok, logged in as: ", client.user.username)
  console.log("Token:", client.token)
  console.log("rawPing:", client.ping)
  console.log("roundedPing:", client.roundedPing)
})

client.on("message", async msg => {
  if (msg.content === "ping") {
    console.log("rawPing:", client.ping)
    console.log("roundedPing:", client.roundedPing)
  }
})

client.login("NDg5NzY0MjkyMTgzMzI2NzIw.DqPXIw.ZuJ-MUNVVwG8oWikNJqCwmWRMFY")
