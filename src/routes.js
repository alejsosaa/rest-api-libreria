import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router();

router.get('/libros', libro.getAll);
router.get('/libro', libro.getOne);
router.post('/libro', libro.add);
router.delete('/libro/isbn', libro.deleteisbn);
router.put('/libro', libro.update);
