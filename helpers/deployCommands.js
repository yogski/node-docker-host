/**
 * expected config
 * {
 *   command: "START", "STATUS", "RESTART", "KILL"
 *   service: {id, github_url, entrypoint, port, project_name, name_alias}
 * }
 */

const { cloneRepository, dockerizeExpress } = require('./execCommands');

const startNewService = async (config) => {
  console.log("running startNewService");
  console.log(config);
  await cloneRepository(config.service.github_url);
  await dockerizeExpress(
    config.service.project_name,
    config.service.entrypoint,
    config.service.port
  );
  return true;
};

const checkServiceStatus = async (config) => {
  console.log("running checkServiceStatus");
  return true;
}

const restartService = async (config) => {
  console.log("running restartService");
  return true;
}

const killService = async (config) => {
  console.log("running killService");
  return true;
}

module.exports = {
  startNewService,
  checkServiceStatus,
  restartService,
  killService,
};