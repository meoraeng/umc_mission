import { response } from "../../config/response.js";
import { status } from "../../config/response.status";
import { joinUser } from "../services/user.service";

export const userSignin = async (req,res,next) => {
    console.log("회원가입을 요청하였습니다.");
    console.log("body:", req.bdoy); // 값을 제대로 받아오는지 체크

    res.send(response(status.SUCCESS, await joinUser(req.body)));
}