import { pool } from "./db.mjs";

export async function insertTodo({ title, content, user_id }) {
  const conn = await pool.getConnection();
  const sql = `insert into todos (title, content, user_id) values (?,?,?)`;
  await conn.query(sql, [title, content, user_id]);
  conn.release();
}

// todo리스트 찾기
export async function findAllTodos() {
  const conn = await pool.getConnection();
  const [rows] = await conn.query("select * from todos");
  conn.release();
  return rows;
}

// 특정 유저의 할 일만 조회하기
export async function findTodosByUserId(userId) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query("select * from todos where user_id = ?", [
    userId,
  ]);
  conn.release();
  return rows;
}

// 할 일 수정
export async function updateTodoById({ id, title, content, userId }) {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "update todos set title =?, content =? where id =? and user_id=?",
    [title, content, id, userId]
  );
  conn.release();
  return result.affectedRows > 0; // 수정 잘 되었는지 여부 반환
}

// 할 일 삭제 (본인 글만 삭제 가능 )
export async function deleteTodoById({ id, userId }) {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "delete from todos where id = ? and user_id=?",
    [id, userId]
  );
  conn.release();
  return result.affectedRows > 0; // 삭제 잘 됐니?
}

// 할 일 완료 상태 토글
export async function toggleTodoDone({ id, userId }) {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "update todos set done = not done where id =? and user_id=?",
    [id, userId]
  );
  conn.release();
  return result.affectedRows > 0;
}
