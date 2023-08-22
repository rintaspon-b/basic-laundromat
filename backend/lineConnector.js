const config = require("./config");
const { Client } = require("@line/bot-sdk");
const client = new Client({
  channelAccessToken: config.line.channelAccessToken,
});

function notifyLineGroupMessage(message, res) {
  try {
    // console.log(message);
    client
      .broadcast(message)
      .then(() => {
        console.log("Send message sucess: " + message.text);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

module.exports = notifyLineGroupMessage;
