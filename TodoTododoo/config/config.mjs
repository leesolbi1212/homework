//활경변수 env에서 불러와서 다른 파일들이 공통적으로 사용할 수 있도록 정리해서 내보내는 환경설정 전용 파일

import dotenv from "dotenv"; // dot env 패키지 불러오기
dotenv.config(); // env 파일 불러오기

export const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, // 사용할 데이터 베이스 이름
  },
  jwt: {
    secretKey: process.env.JWT_SECRET, // 토큰 암호화할 때 비밀키
    expiresInSec: 86400, // 토큰 만료 시간 (초)
  },

  host: {
    port: process.env.PORT || 5000, // 서버가 실행될 포트번호, 기본값 5000
  },
};

// process를 붙이는 이유 : 그냥 접근할 때 붙여야 함.
