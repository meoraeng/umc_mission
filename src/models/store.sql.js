export const getStoreById = "SELECT * FROM store WHERE id = ?";

export const insertStoreSql = "INSERT INTO store (name, address, region_id) VALUES (?,?,?);";

export const getReviewById = "SELECT * FROM review WHERE id = ?";

export const insertReviewSql = "INSERT INTO review (member_id, store_id, score, content) VALUES (?,?,?,?);";

export const getMissionById = "SELECT * FROM mission WHERE id = ?";

export const insertMissionSql = "INSERT INTO mission (store_id, name, mission_spec, reward) VALUES (?,?,?,?)";


export const getMemberMissionById = "SELECT * FROM member_mission WHERE id = ?";

export const changeStatusToProgress = "UPDATE member_mission SET status = ? WHERE id=?"

export const changeStatusToCompleted = "UPDATE member_mission SET status = 'Completed' WHERE id=?"
