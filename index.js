require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const sequelize = require('./config/database');
const nodeServiceRoutes = require('./routes/nodeServiceRoutes');
const subscribeToChannel = require('./redis/subscriber');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', nodeServiceRoutes);

const checkDocker = () => {
  return new Promise((resolve, reject) => {
    exec('docker info', (error, stdout, stderr) => {
      if (error) {
        reject(new Error('Docker is not running. Please start Docker and try again.'));
      } else {
        resolve(true);
      }
    });
  });
};

const startServer = async () => {
  try {
    await checkDocker();
    console.log('Docker is running.');

    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();

    subscribeToChannel(process.env.REDIS_CHANNEL);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
