const express = require('express');
const router = express.Router();

const registerController = require('./../controller/registerController');
const validateRegister = require('./../middleware/registerMiddleware');

router.get('/', registerController.getRegisters);
router.post('/', validateRegister, registerController.createRegister);
router.put('/:id', validateRegister, registerController.updateRegister);
router.delete('/:id', registerController.deleteRegister);

module.exports = router;
