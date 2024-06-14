const crypto = require('crypto');
const NodeService = require('../models/nodeService');

const allocateServicePort = async () => {
  const getPorts = await NodeService.findAll({
    attributes: ['port']
  })
  const availablePorts = generateRange(Number(process.env.DOCKER_PORT_LOWER_BOUND), Number(process.env.DOCKER_PORT_UPPER_BOUND))
  return findExclusiveElement(availablePorts, getPorts.map(p => p.dataValues.port));
};

const generateServiceName = () => {
  return crypto.randomBytes(64)
  .toString('base64')
  .replace(/[^a-zA-Z0-9]/g, '')
  .slice(0, 16);
}

const generateRange = (minValue, maxValue) => {
  return Array.from({ length: maxValue - minValue + 1 }, (_, index) => minValue + index);
}

const findExclusiveElement = (arrA, arrB) => {
  const setB = new Set(arrB)
  for (const element of arrA) {
    if (!setB.has(element)) {
      return element; // Return the first element not in arrB
    }
  }
  return null; // If all elements are in arrB
};

module.exports = {
  allocateServicePort,
  generateServiceName,
};