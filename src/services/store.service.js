import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { createStoreResponseDTO,writeReviewResponseDTO } from "../dtos/store.dto";
import { addStore, getStore, addReview, getReview } from "../models/store.dao";

export const createStore = async (body) => {
    const {name, region_id, address} = body;
    
    const createStoreData = await addStore({
        'name': name,
        'address': address,
        'region_id': region_id,
    })

    if(createStoreData == -1) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } else {
        // setRegion(createStoreData); // 지역 - 가게 매핑
        return createStoreResponseDTO(await getStore(createStoreData))
    }
}

export const writeReviewToStore = async (params, body) => {
    const {member_id, score, content} = body;
    console.log('params.store_id:',params.store_id);
    const writeReviewData = await addReview({
        'member_id': member_id,
        'store_id': params.store_id,
        'score': score,
        'content': content
    })
    console.log('writeReviewData.store_id:',writeReviewData);
    if(writeReviewData == -1) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } else {
        return writeReviewResponseDTO(await getReview(writeReviewData))
    }
}