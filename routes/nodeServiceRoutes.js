const express = require('express');
const {
  createNodeService,
  getAllNodeServices,
  getNodeServiceById,
  updateNodeService,
  deleteNodeService,
} = require('../controllers/nodeServiceController');

const router = express.Router();

router.post('/services', createNodeService);
router.get('/services', getAllNodeServices);
router.get('/services/:id', getNodeServiceById);
router.put('/services/:id', updateNodeService);
router.delete('/services/:id', deleteNodeService);

module.exports = router;
