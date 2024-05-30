import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertStoreSql, getStoreById, insertReviewSql, getReviewById, getMissionById, insertMissionSql, changeStatusToProgress,  changeStatusToCompleted, getMemberMissionById} from "./store.sql.js";


export const addStore = async (data) => {
    try{
        const conn = await pool.getConnection();
        const result = await pool.query(insertStoreSql, [data.name, data.address, data.region_id]);

        conn.release();
        return result[0].insertId;

    }catch(err) {
        console.log('addStore Error:',err)
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStore = async (storeId) => {
    try{
        const conn = await pool.getConnection();
        const [store] = await pool.query(getStoreById, storeId);

        console.log(store);

        if(store.length==0) {
            return -1;
        }

        conn.release();
        return store;
    }catch(err) {
        console.log('getStore Error:',err)
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addReview = async (data) =>{
    try{
        const conn = await pool.getConnection();
        const {member_id, store_id, score, content} = data;
        const store = await getStore(store_id);
        if(!store.length){
            throw new BaseError(status.NOT_FOUND);
        }
        const result = await pool.query(insertReviewSql, [member_id, store_id, score, content]);

        conn.release();
        return result[0].insertId;

    }catch(err) {
        console.log('addReview Error:',err)
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getReview = async (reviewId) => {
    try{
        const conn = await pool.getConnection();
        const [review] = await pool.query(getReviewById, reviewId);

        console.log(review);

        if(review.length==0){
            return -1;
        }

        conn.release();
        return review;
    }catch(err){
        console.log('getReview Error:',err)
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addMission = async (data) => {
    try{
        const {store_id, name, mission_spec, reward} = data;
        const conn = await pool.getConnection();
        const store = await getStore(store_id);
        if(!store.length){
            throw new BaseError(status.NOT_FOUND);
        }
        const result = await pool.query(insertMissionSql, [
            store_id, name ,mission_spec, reward
        ]);

        conn.release();
        return result[0].insertId;
    }catch(err) {
        console.log('addMission Error:', err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getMission = async (missionId) =>{
    try {
        const conn = await pool.getConnection();
        const [mission] = await pool.query(getMissionById, missionId);

        console.log(mission);

        if(mission.length==0){
            return -1;
        }

        conn.release();
        return mission;
    } catch(err){
        console.log('getMission Error:',err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getMemberMission = async (memberMissionId) => {
    try{
        const conn = await pool.getConnection();
        const [memberMission] = await pool.query(getMemberMissionById,memberMissionId)

        if(memberMission.length==0){
            return -1;
        }

        conn.release();
        return memberMission;
    }catch(err){
        console.log('getMemberMission Error:',err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const modifyMemberMission = async (data) => {
    try{
        const values = [data.status, data.member_mission_id]
        const conn = await pool.getConnection();
        let result;
    
        if (data.status == 'In_Progress'){
            [result] = await pool.query(changeStatusToProgress, values);
        } else if(data.status == 'Completed'){
            [result] = await pool.query(changeStatusToCompleted,values);
        }
        conn.release();
        return data.member_mission_id;
    } catch(err) {
        console.log('updateMemberMission Error:', err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

