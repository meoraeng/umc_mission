import { pool } from "../../config/db.config";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { connectFoodCategory, confirmEmail, getUserID, insertUserSql, getPreferToUserID } from "./user.sql.js";

export const addUser = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmEmail, data.email); // pool.query() 의 리턴값은 배열 2개, 그 중 첫번째 값만 confirm 변수에 담는 코드 - 비구조화할당

        if (confirm[0].isExistEmail){
            conn.release();
            return -1;
        }
        const result = await pool.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

        conn.release();
        return result[0].insertId;

    }catch(err) {
        throw new BaseError(status.PARAMTER_IS_WRONG);
    }
}

export const getUser = async (userId) => {
    try{
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        console.log(user);

        if(user.length==0) {
            return -1;
        }

        conn.release();
        return user;
    }catch(err) {
        throw new BaseError(status.PARAMTER_IS_WRONG);
    }
}
// 선호 음식 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try{
        const conn = await pool.getConnection();

        await pool.query(connectFoodCategory, [foodCategoryId,userId]);

        conn.release();

        return;
    } catch(err) {
        throw new BaseError(status.PARAMTER_IS_WRONG);
    }
}

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserID, userID);

        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}