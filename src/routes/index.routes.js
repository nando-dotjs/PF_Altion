const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Nombre: Fernando');
});

module.exports = router;