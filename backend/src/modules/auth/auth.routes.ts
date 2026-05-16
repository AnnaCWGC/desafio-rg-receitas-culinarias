import { Router } from 'express';
import { asyncHandler } from '../../shared/utils/asyncHandler';
import { AuthController } from './auth.controller';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', asyncHandler(authController.register));
authRoutes.post('/login', asyncHandler(authController.login));

export { authRoutes };