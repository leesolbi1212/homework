// jwt 토큰을 검증해서, 로그인한 사용자만 API 사용 가능하게 제한 (인증)

import jwt from "jsonwebtoken";
import { config } from "../config/config.mjs";
import * as userRepo from "../repository/userRepository.mjs";

// jwt 토큰 유효성 검증 미들웨어
export function isAuth(req, res, next) {
  // 1. Authorization 헤더에서 토큰 꺼내기
  const authHeader = req.get("Authorization");

  // 2. 토큰이 없으면 401 (인증안됨)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "인증 토큰이 없습니다" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer xxx" -> xxx만 추출

  // 3. 토큰 검증
  jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
    req.user = decoded; // 복호화된 사용자 정보 저장 (req.user.id)
    next(); // 다음 미들웨어 또는 컨트롤러 진행
  });
}
