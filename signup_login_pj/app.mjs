// 메인 서버 실행 파일
// Express 서버를 생성하고, 라우터 연결, 정적 파일 제공 역할

import express from "express"; // express 불러오기
import authRouter from "./router/authRouter.mjs"; //회원가입, 로그인 라우터 가져오기
import path from "path"; // 경로 설정
import { fileURLToPath } from "url"; // __dirname을 사용하기 위한 설정
import { config } from "./config.mjs"; // config에서 환경변수 읽어오기

// __dirname을 사용하기 위한 코드
const __filename = fileURLToPath(import.meta.url); // 현재 파일의 전체 경로
const __dirname = path.dirname(__filename); // 현재 디렉토리 경로

const app = express(); // express app 생성

app.use(express.json()); //json 형식의 body를 해석

// html, js, css등을 정적으로 제공
app.use(express.static(__dirname));

app.use("/auth", authRouter);

app.listen(config.host.port, () => {
  console.log("서버 실행 즁~!");
});
