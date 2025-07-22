
import { Router } from 'express';
import { createTag, getAlltags } from '../controller/tag_controller';

import { authM } from '../middlewares/auth_middleware'


const router = Router();


router.post('/create_tag', authM,createTag);
 

router.get('/tags',authM, getAlltags);

export default router;