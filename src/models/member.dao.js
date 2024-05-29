import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { connectFoodCategory, confirmEmail, getMemberID, insertMemberSql, getPreferToMemberID } from "./member.sql.js";

export const addMember = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmEmail, data.email); // pool.query() 의 리턴값은 배열 2개, 그 중 첫번째 값만 confirm 변수에 담는 코드 - 비구조화할당

        if (confirm[0].isExistEmail){
            conn.release();
            return -1;
        }
        const result = await pool.query(insertMemberSql, [data.email, data.name, data.gender, data.birth, data.addr, data.phone]);

        conn.release();
        return result[0].insertId;

    }catch(err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getMember = async (memberId) => {
    try{
        const conn = await pool.getConnection();
        const [member] = await pool.query(getMemberID, memberId);

        console.log(member);

        if(member.length==0) {
            return -1;
        }

        conn.release();
        return member;
    }catch(err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
// 선호 음식 매핑
export const setPrefer = async (memberId, foodCategoryId) => {
    try{
        const conn = await pool.getConnection();

        await pool.query(connectFoodCategory, [foodCategoryId,memberId]);

        conn.release();

        return;
    } catch(err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 사용자 선호 카테고리 반환
export const getMemberPreferToMemberID = async (memberID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToMemberID, memberID);

        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}