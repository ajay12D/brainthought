
import { Router } from "express";
import { LinkCreation, getConentBylink} from "../controller/link_controller";
import { authM } from "../middlewares/auth_middleware";


const router = Router();


router.post('/share', authM,LinkCreation);


router.get('/:shareLink', getConentBylink);


export default router;

