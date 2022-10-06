const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Cómo estás Lucas?');
});

module.exports = router;