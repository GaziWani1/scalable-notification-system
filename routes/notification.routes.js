import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js'
import {postNotification , getNotification} from '../controller/notification.controller.js'
const route = Router();

route.post('/' ,  authMiddleware ,postNotification)
route.get('/' , authMiddleware , getNotification)

export default route;