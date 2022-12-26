const router = require('express').Router();
const controller = require('./freights.controller');
const auth = require('../../middleware/auth.middleware');

router.get('/removed', auth, controller.getRemovedFreights);

router.delete('/', auth, controller.removeFreight);

router.put('/', auth, controller.editFreight);

router.post('/', auth, controller.createFreight);

router.get('/', auth, controller.getAllFreights);

module.exports = router;
