
import Express from 'express';
import { signup } from '../controllers/usersController';

const router = Express.Router();


router.post('/api/v1/auth/signup', signup);
router.post('/api/v1/auth/signin', signup);


export default router;
