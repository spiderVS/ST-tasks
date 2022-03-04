import { Router } from 'express';
import * as controller  from '../controllers/TodoController';

const router = Router();

router.get("/", controller.checkQuery, controller.getAll);
router.get("/:id", controller.getOne);
router.post('/', controller.createOne);
router.patch('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);
router.all('*', controller.badPath);

export default router;
