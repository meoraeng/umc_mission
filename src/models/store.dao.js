import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { insertStoreSql, getStoreById, insertReviewSql, getReviewById } from "./store.sql.js";


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