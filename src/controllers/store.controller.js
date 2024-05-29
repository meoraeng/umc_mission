import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { createStore, writeReviewToStore } from "../services/store.service.js";

export const createNewStore = async (req,res,next) => {
    console.log("새로운 가게 생성을 요청하였습니다.");
    console.log("body:", req.body); // 값을 제대로 받아오는지 체크

    res.send(response(status.SUCCESS, await createStore(req.body)));
}

export const writeReview = async (req,res,next) => {
    console.log(`${req.body.store_id}번 가게에서 리뷰 작성을 요청하였습니다.`);
    console.log("body:", req.body );
    console.log("params:", req.params);

    res.send(response(status.SUCCESS, await writeReviewToStore(req.params, req.body)));
}