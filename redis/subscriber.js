const Redis = require('ioredis');
const { startNewService, restartService, checkServiceStatus, killService } = require('../helpers/deployCommands');
const redis = new Redis(process.env.REDIS_URL);

const subscribeToChannel = (channel) => {
  redis.subscribe(channel, (err, count) => {
    if (err) {
      console.error('Failed to subscribe: %s', err.message);
    } else {
      console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
    }
  });

  redis.on('message', (channel, message) => {
    if (channel == process.env.REDIS_CHANNEL) {
			const deployConfig = JSON.parse(message);
			console.log(`Received command via ${channel}:`, deployConfig);
			
			switch (deployConfig.command) {
				case "START":
					startNewService(deployConfig)
					break;
				case "RESTART":
					restartService(deployConfig)
					break;
				case "STATUS":
					checkServiceStatus(deployConfig)
					break;
				case "KILL":
					killService(deployConfig)
					break;
				default:
					break;
			}
    }
  });
};

module.exports = subscribeToChannel;
