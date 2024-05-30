import express from "express";
import asyncHandler from 'express-async-handler';

import { createNewStore, writeReview,createNewMission,updateMemberMissionStatus } from "../controllers/store.controller";

export const storeRouter = express.Router();


storeRouter.get('/', (req,res)=>{res.send('hi store')});
storeRouter.post('/create', asyncHandler(createNewStore));
storeRouter.post('/review/:store_id', asyncHandler(writeReview));
storeRouter.post('/mission/:store_id', asyncHandler(createNewMission));
storeRouter.patch('/mission/:member_mission_id', asyncHandler(updateMemberMissionStatus));