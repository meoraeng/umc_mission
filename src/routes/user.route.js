import express from 'express';
import { userSignin } from '../controllers/user.controller';

export const userRouter = express.Router();
userRouter.get('/signin', userSignin);