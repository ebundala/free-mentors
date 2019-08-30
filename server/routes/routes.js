
import Express from 'express';
import { signup, signin, me } from '../controllers/usersController';
import auth from '../middlewares/auth';

const router = Express.Router();
router.post('/api/v1/auth/signup', signup);
router.post('/api/v1/auth/signin', signin);
router.use(auth);
router.get('/api/v1/me', me);

export default router;
