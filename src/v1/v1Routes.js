const express = require('express');
const router = express.Router();
const imageRouter = require('./routes/imageRoutes');
const tagRouter = require('./routes/tagRoutes');

router.use('/images', imageRouter);
router.use('/tags', tagRouter);

module.exports = router;