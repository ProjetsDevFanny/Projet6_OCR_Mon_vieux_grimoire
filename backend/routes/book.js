const express = require('express');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');
const multer = require('../middleware/multer-config');
const convertToWebp = require('../middleware/sharp');

const router = express.Router();

router.get('/', bookCtrl.getAllBook);
router.get('/bestrating', bookCtrl.getBestRatedBooks);
router.get('/:id', bookCtrl.getOneBook);

router.post('/', auth, multer, convertToWebp, bookCtrl.createBook);
router.put('/:id', auth, multer, convertToWebp, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;