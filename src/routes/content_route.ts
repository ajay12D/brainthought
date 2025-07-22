

import { Router } from 'express';
import { createContent, getContent, delContnet } from '../controller/content';
import { authM } from '../middlewares/auth_middleware';

const router = Router();

router.post('/content_creation', authM, createContent);

router.get('/getContentById',authM, getContent);

router.delete('/delete', delContnet)

export default router;