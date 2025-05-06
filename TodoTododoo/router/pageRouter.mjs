import { Router } from "express";
import path from "path"; //파일 경로를 OS에 맞게 처리함.
import { fileURLToPath } from "url";
// ES 모듈에서는 __filename, __dirname이 자동 제공되지 않기 때문에 import.meta.url을 실제 파일 경로로 바꾸기 위해 사용함.

// ES 모듈에서 __dirname 사용 설정 (html 파일을 경로 기반으로 보낼 때 반드시 필요)
const __filename = fileURLToPath(import.meta.url); //현재 파일의 전체 경로
const __dirname = path.dirname(__filename); //현재 파일이 있는 폴더 경로

// 라우터 생성
const router = Router();

// 홈페이지
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// 로그인 화면
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

// 회원가입 화면
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

// 나의 할 일 화면
router.get("/mytodos", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mytodos.html"));
});

export default router;
