module.exports = {
  basic: {
    port: 3000,
  },

  notification: {
    message: "Your laundry is fresh and ready in 60 seconds! 🧺✨",
    notifyBeforeTimeout: 60, // unit = seconds
  },

  authorizer: {
    secret: "basic-laundromat-app-secret",
    expire: "8h"
  },

  database: {
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 4002,
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_DATABASE || "basic_laundromat",
  },

  line: {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN  || "O8sXKFqYykzebR47FuKiGbfmkacA9gz/taffAVmz+XpfxLSpJu/+SYZx6FCwUk57NpdJNj/U8lycHLetTGbB6axesr2GLdFEl4NJ9NNPMj45toX6qFDlLHaw16oXGZxwx9QLfQZSyR+uJPZdfKeDpgdB04t89/1O/w1cDnyilFU=",
  },
};
