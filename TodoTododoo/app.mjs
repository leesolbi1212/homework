import express from "express"; // express 프레임 워크 불러오기

import bcrypt from "bcrypt";

// ES 모듈에서 __dirname과 __filename 사용하기 위한 설정
import path from "path";
import { fileURLToPath } from "url";

// CORS 오류 방지를 위한 미들웨어
import cors from "cors";

// 환경설정 파일 config 불러오기 -> 포트번호, jwt 키 등
import { config } from "./config/config.mjs";

// 라우터 파일 불러오기
import userRouter from "./router/userRouter.mjs";
import todoRouter from "./router/todoRouter.mjs";

// 현재 파일의 경로 구하기 (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express app 생성
const app = express();

// json 형식의 요청 바디를 자동으로 파싱해주는 미들웨어
app.use(express.json());

// Cors 허용 설정 (다른 origin에서 API 요청 가능하게)
app.use(cors());

// 정적 파일 (css, js, html) 을 서비스 하기 위한 디렉토리 설정
app.use(express.static(__dirname));

// 회원 관련 API 라우팅 처리 (ex : auth/signup, /auth/login)
app.use("/auth", userRouter);

// 할 일 관련 API 라우팅 처리 (ex : /todos/create, /todos/:id 등)
app.use("/todos", todoRouter);

// 서버 실행
app.listen(config.host.port, () => {
  console.log(`서버가 ${config.host.port}번 포트에서 실행 중입니다.`);
});
