// 회원가입/로그인 라우터 설정 파일

import express from "express";
import { signup, login } from "../controller/authController.mjs"; //컨트롤러에서 signup, login 함수 가져오기

const router = express.Router(); // 라우터 객체 생성

// [POST] 회원가입 (회원정보 등록)
router.post("/signup", signup); //auth/signup 요청 시 signup 함수 실행

// [POST] 로그인 (토큰 발급)
router.post("/login", login);

export default router; // 다른 파일에서 사용할 수 있게 export
