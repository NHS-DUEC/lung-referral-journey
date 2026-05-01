// ########################################################
// External dependancies
// ########################################################
const express = require('express')
const router = express.Router()

// ########################################################
// Your routes beneath here
// ########################################################

router.use('/version-1', require('./routes/version-1'))
router.use('/version-3', require('./routes/version-3'))
router.use('/version-4', require('./routes/version-4'))

// ########################################################
module.exports = router
// ########################################################
