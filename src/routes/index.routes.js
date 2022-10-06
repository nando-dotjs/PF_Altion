const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Hola Fernando como estas');
});

module.exports = router;