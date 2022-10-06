const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Bien de bien?');
});

module.exports = router;