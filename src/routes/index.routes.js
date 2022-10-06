const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Nombre: Lucas');
});

module.exports = router;