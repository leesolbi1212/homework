// mysql2/promise 모듈을 불러온다
// promise 기반으로 My SQL을 비동기로 다룰 수 있음 (await 사용 가능)
import mysql from "mysql2/promise";

// config.js에서 DB 접속 정보 (host, user, password 등)를 가져옴.
import { config } from "../config/config.mjs";

// MySQL 연결 풀(pool) 생성하기
// pool은 다수 클라이언트 요청에 대해 연결을 효율적으로 재사용하게 해줌
// 매번 DB 연결을 새로생성하면 성능이 매우 떨어짐. pool을 만들면 내부에서 연결을 재활용해서 처리 속도가 뤟씬 빨라짐
// 실무에서 mysql2/promise + createPool()은 표준처럼 쓰임
export const pool = mysql.createPool({
  host: config.db.host, // DB 서버 주소 (localhost)
  user: config.db.user, // DB 접속 ID (root)
  password: config.db.password, // DB 비밀번호
  database: config.db.database, // 사용할 DB 이름
});
