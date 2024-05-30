export const createStoreResponseDTO = (store) => {
    return {"name": store[0].name, "address": store[0].address, "region_id": store[0].region_id};
}

export const writeReviewResponseDTO = (review) => {
    return {"member_id": review[0].member_id, "store_id": review[0].store_id, "score": review[0].score, "content": review[0].content, }
}

export const createMissionResponseDTO = (mission) => {
    return {"name": mission[0].name, "store_id": mission[0].store_id, "mission_spec": mission[0].mission_spec, "reward": mission[0].reward, };
}

export const updateMemberMissionStatusResponseDTO = (memberMission) => {
    return {"member_mission_id": memberMission[0].id, "status": memberMission[0].status};
} 