const express = require('express');
const router = express.Router();

const userVarController = require('./../User-Controller/User-variables-Controller.js');

router.get('/',userVarController.getUserVars)

router.post('/', userVarController.postModifyVariables)

router.get('/config', userVarController.configUI)

module.exports = router;