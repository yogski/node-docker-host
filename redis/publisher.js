const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

const publishMessage = (channel, message) => {
  redis.publish(channel, JSON.stringify(message));
};

module.exports = publishMessage;
