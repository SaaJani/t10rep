import express from 'express';
import UserController from '../controllers/usercontroller.js';
import authorize from '../verifytoken.js';

const router = express.Router();

router.post('/register', authorize, UserController.registerUser);
router.post('/login', UserController.authenticateUser);
export default router;
