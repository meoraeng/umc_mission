export const createStoreResponseDTO = (store) => {
    return {"name": store[0].name, "address": store[0].address, "region_id": store[0].region_id};
}

export const writeReviewResponseDTO = (review) => {
    return {"member_id": review[0].member_id, "store_id": review[0].store_id, "score": review[0].score, "content": review[0].content, }
}