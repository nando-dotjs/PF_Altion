const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Todo bien Fer');
});

module.exports = router;