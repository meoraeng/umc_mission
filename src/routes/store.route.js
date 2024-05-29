import express from "express";
import asyncHandler from 'express-async-handler';

import { createNewStore, writeReview } from "../controllers/store.controller";

export const storeRouter = express.Router();


storeRouter.get('/', (req,res)=>{res.send('hi store')});
storeRouter.post('/create', asyncHandler(createNewStore));
storeRouter.post('/review/:store_id', asyncHandler(writeReview));