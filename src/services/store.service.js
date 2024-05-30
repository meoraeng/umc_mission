import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { createMissionResponseDTO, createStoreResponseDTO,writeReviewResponseDTO,updateMemberMissionStatusResponseDTO } from "../dtos/store.dto";
import { addStore, getStore, addReview, getReview, getMission, addMission, modifyMemberMission, getMemberMission} from "../models/store.dao";

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
    const writeReviewData = await addReview({
        'member_id': member_id,
        'store_id': params.store_id,
        'score': score,
        'content': content
    })
    
    if(writeReviewData == -1) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    } else {
        return writeReviewResponseDTO(await getReview(writeReviewData))
    } 
}

export const createMission = async (params, body) => {
    const {name, mission_spec, reward} = body;
    const createMissionData = await addMission({
        'name': name,
        'store_id': params.store_id,
        'mission_spec': mission_spec,
        'reward': reward
    }) 

    if(createStoreData == -1){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }else{
        return createMissionResponseDTO(await getMission(createMissionData))
    }
    
}

export const updateMemberMission = async (params , query) => {
    const updateMemberMissionStatusData = await modifyMemberMission({
        'member_mission_id': params.member_mission_id,
        'status': query.status
    })


    if(updateMemberMissionStatusData == -1){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }else{
        return updateMemberMissionStatusResponseDTO(await getMemberMission(updateMemberMissionStatusData))
    }
}