const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Hola Lucas como estas');
});

module.exports = router;