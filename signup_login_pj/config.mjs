// 환경변수를 읽어서, 다른 파일에서 쉽게 사용할 수 있게 설정

import dotenv from "dotenv"; //dotenv 패키지로 .env파일 읽기
dotenv.config(); // .env 파일을 process.env에 등록

// 환경변수가 없으면 에러를 내주는 함수
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`환경변수 ${key}가 설정되지 않았슈!`);
  }
  return value;
}

// 환경변수들을 하나의 객체로 모아서 export

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 5000)),
  },
};
