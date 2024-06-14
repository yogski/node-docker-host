/**
 * expected config
 * {
 *   command: "START", "STATUS", "RESTART", "KILL"
 *   name_alias: name for service
 *   port: port for mapping 
 *   db_id: database identifier
 * }
 * 
 *  
 */

// const simpleGit = require('simple-git');

const startNewService = async (config) => {
  console.log("running startNewService");
  console.log(config);
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