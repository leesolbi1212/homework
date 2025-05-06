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
import pageRouter from "./router/pageRouter.mjs";

// 현재 파일의 경로 구하기 (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// express app 생성
const app = express();

// 미들웨어
app.use(express.json()); // json 형식의 요청 바디를 자동으로 파싱해주는 미들웨어
app.use(cors()); // Cors 허용 설정 (다른 origin에서 API 요청 가능하게)

//정적 폴더 등록
// app.mjs 예시
app.use("/", express.static(path.join(__dirname, "views")));
app.use("/css", express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "public/js")));

// 라우팅
app.use("/auth", userRouter); // 회원 관련 API 라우팅 처리 (ex : auth/signup, /auth/login)
app.use("/todos", todoRouter); // 할 일 관련 API 라우팅 처리 (ex : /todos/create, /todos/:id 등)
app.use("/", pageRouter); // 페이지 관련 라우팅

// 서버 실행
app.listen(config.host.port, () => {
  console.log(`서버가 ${config.host.port}번 포트에서 실행 중입니다.`);
});
