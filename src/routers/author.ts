import express from 'express';
import controller from '../controllers/author';

const router = express.Router();

router.post('/create', controller.createAuthor);
router.get('/get/author', controller.readAuthor);
router.get('/get', controller.readAllAuthor);
router.patch('/update/:authorId',  controller.UpdateAuthor);
router.delete('/delete/:authorId', controller.DeleteAuthor);

export = router;