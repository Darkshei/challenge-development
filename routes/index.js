const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.render("index");
});

router.get('/repos/:username', async (req, res, next) => {
    res.render("repos")
});

module.exports = router;
