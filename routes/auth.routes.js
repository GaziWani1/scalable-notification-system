import { Router } from 'express';
import { login, signUp } from '../controller/auth.controller.js';

const route = Router();

route.post('/sign-up', signUp);
route.post('/sign-in', login);

export default route;