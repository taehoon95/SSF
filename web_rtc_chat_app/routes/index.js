// 11 19 강동하 /api 라우터 구현
var express = require('express');
var router = express.Router();
// 11 19 강동하 /api/email 라우터 구현
const emailRouter = require('./email');

router.get('/', (req, res, next) => {
    res.send('respond with a resource /api');
});

// 11 19 강동하 /api 라우터 구현
router.use('/email', emailRouter);

module.exports = router;
  