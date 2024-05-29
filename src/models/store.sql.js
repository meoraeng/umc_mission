export const getStoreById = "SELECT * FROM store WHERE id = ?";

export const insertStoreSql = "INSERT INTO store (name, address, region_id) VALUES (?,?,?);";

export const getReviewById = "SELECT * FROM review WHERE id = ?"

export const insertReviewSql = "INSERT INTO review (member_id, store_id, score, content) VALUES (?,?,?,?);"