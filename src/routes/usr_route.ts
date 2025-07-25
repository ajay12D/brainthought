
import {Router} from 'express';
import { signIn, signUp, ge_users } from '../controller/usr_auth';
import { authM } from '../middlewares/auth_middleware';


const router =  Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);

router.get('/users', authM, ge_users);


export default router;
