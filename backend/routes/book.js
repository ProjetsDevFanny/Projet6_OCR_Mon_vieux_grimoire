const express = require('express');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');
const multer = require('../middleware/multer-config');

const router = express.Router();

router.get('/', bookCtrl.getAllBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/bestrating', bookCtrl.getBestRatedBooks);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;