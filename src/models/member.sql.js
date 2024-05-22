export const insertMemberSql = "INSERT INTO member (email, name, gender, birth, address, phone_number) VALUES (?,?,?,?,?,?);"


export const getMemberID = "SELECT * FROM member WHERE id = ?";

export const connectFoodCategory = "INSERT INTO member_prefer (category_id, member_id) VALUES (?, ?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail";

export const getPerferToMemberID = 
"SELECT mp.id, mp.category_id, mp.member_id, ca.name" + "FROM member_prefer mp JOIN category ca on mp.category_id = ca.id"
+ "WHERE mp.member_id = ? ORDER BY mp.category_id ASC;";