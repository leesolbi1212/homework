// db.mjs에서 만든 pool(연결 객체)을 가져와서 회원가입, 로그인 등 사용자 관련 SQL 쿼리 수행

// DB 연결 객체(pool)를 가져온다.
import { pool } from "./db.mjs";

// 회원가입할 때 정보를 DB에 저장
export async function createUser(user) {
  // DB에서 만들어놓은 연결 중 하나 빌림 (비동기)
  const conn = await pool.getConnection(); // 작업이 끝나면 conn.release()로 반납해줘야함.
  // sql 쿼리 작성 : user 테이블에 새 사용자 정보 insert
  const sql = `
    insert into users (userid, userpw, name, hp, email, gender, ssn1, ssn2, zipcode, address1, address2, address3)
    values(?,?,?,?,?,?,?,?,?,?,?,?)`;
  // 쿼리 실행 : 물음표(?)는 user 객체 값으로 대체됨.
  await conn.query(sql, [
    user.userid,
    user.userpw,
    user.name,
    user.hp,
    user.email,
    user.gender,
    user.ssn1,
    user.ssn2,
    user.zipcode,
    user.address1,
    user.address2,
    user.address3,
  ]);
  // 작업이 끝나면 반납!
  conn.release();
}

// 로그인할 때 DB에서 사용자 찾기
export async function findByUserid(userid) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query("select * from users where userid = ?", [
    userid,
  ]);
  conn.release();
  return rows[0]; // 일치하는 사용자 1명 반환
}
