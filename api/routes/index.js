var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user');
var ctrlProject = require('../controllers/project');

router.post('/user', ctrlUser.newUser);
router.post('/project', ctrlProject.newProject);

module.exports = router;
