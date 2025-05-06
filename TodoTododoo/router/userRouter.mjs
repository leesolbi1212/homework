// 클라이언트가 signup으로 POST 요청을 보내면, userController.signup 함수를 실행하도록 연결해주는 역할

// express 모듈에서 Router 기능만 불러오기
import { Router } from "express";
// 회원가입 로직이 들어있는 컨트롤러 함수 불러오기
import * as userController from "../controller/userController.mjs";
// 로그인 로직이 들어있는 함수 불러오기
import { login } from "../controller/userController.mjs";
// 미들웨어 불러오기
import { isAuth } from "../middleware/auth.mjs";

// express의 Router 인스턴스 만들기 (미니 앱)
const router = Router();

//POST 방식으로 "/signup" 경로로 요청이 오면 -> userController.signup 실행
router.post("/signup", userController.signup);
//POST 방식으로 "/login" 경로로 요청이 들어오면 -> userController.login 실행
router.post("/login", userController.login);
//GET 방식으로 사용자 조회 요청이 들어오면
router.get("/me", isAuth, userController.me);
//GET 방식으로 아이디 중복 확인
router.get("/check-id", userController.checkDuplicateId);

export default router;
