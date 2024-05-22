import express from "express";
import asyncHandler from 'express-async-handler';

import { memberSignin } from "../controllers/member.controller.js";

export const memberRouter = express.Router();

memberRouter.post('/signin', asyncHandler(memberSignin));
memberRouter.get('/', (req,res)=>{res.send('hi member');})