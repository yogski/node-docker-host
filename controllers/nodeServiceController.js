const axios = require('axios');
const NodeService = require('../models/nodeService');
const nodeServiceSchema = require('../validators/nodeServiceValidator');
const { v4: uuidv4 } = require('uuid');
const { allocateServicePort, generateServiceName } = require('../helpers/serviceAllocation');
const publishMessage = require('../redis/publisher');

const checkGitHubRepo = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) throw new Error('GitHub repository not found');

    const packageJsonUrl = `${url.replace('github.com', 'api.github.com/repos')}/contents`;
    console.log(packageJsonUrl);
    const packageJsonResponse = await axios.get(packageJsonUrl);

    if (packageJsonResponse.status !== 200) throw new Error('Not a JavaScript repository');
    console.log(`Github URL ${url} found.`)
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createNodeService = async (req, res) => {
  try {
    console.log("entry tooo yo");
    console.log(req.body)
    const { error, value } = nodeServiceSchema.validate(req.body);
    console.log("ada error?",error)
    console.log("lha value?", value);
    if (error) return res.status(400).json({ error: error.details[0].message });

    await checkGitHubRepo(value.github_url);

    value.id = uuidv4();
    value.port = await allocateServicePort();
    if (!value.port) return res.status(500).json({ error: "No available ports." })
    value.name_alias = generateServiceName();
    value.service_status = "IN-DEPLOYMENT";
    value.is_active = true;
    
    const nodeService = await NodeService.create(value);

    const jsonCommand = {
      command: "START",
      db_id: nodeService.dataValues.id,
      name_alias: nodeService.dataValues.name_alias,
      port: nodeService.dataValues.port,
    }
    publishMessage(process.env.REDIS_CHANNEL, jsonCommand)

    res.status(201).json(nodeService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllNodeServices = async (req, res) => {
  try {
    const nodeServices = await NodeService.findAll();
    res.status(200).json(nodeServices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNodeServiceById = async (req, res) => {
  try {
    const nodeService = await NodeService.findByPk(req.params.id);
    if (!nodeService) return res.status(404).json({ error: 'NodeService not found' });
    res.status(200).json(nodeService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNodeService = async (req, res) => {
  try {
    const { error, value } = nodeServiceSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    await checkGitHubRepo(value.github_url);

    const nodeService = await NodeService.update(value, {
      where: { id: req.params.id },
      returning: true,
    });
    if (!nodeService[0]) return res.status(404).json({ error: 'NodeService not found' });
    res.status(200).json(nodeService[1][0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNodeService = async (req, res) => {
  try {
    const nodeService = await NodeService.destroy({ where: { id: req.params.id } });
    if (!nodeService) return res.status(404).json({ error: 'NodeService not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNodeService,
  getAllNodeServices,
  getNodeServiceById,
  updateNodeService,
  deleteNodeService,
};
