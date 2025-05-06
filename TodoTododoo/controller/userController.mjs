// 요청(req)에서 필요한 데이터 꺼내기
// 비밀번호 암호화 등 전처리
// userRepository에 전달해서 DB 저장
// 성공/실패 여부를 클라이언트에게 응답(JSON)

// 비밀번호 암호화를 위한 bcrypt 모듈 가져오기
import bcrypt from "bcrypt";
// 사용자 쿼리 함수가 있는 repository 불러오기
import * as userRepo from "../repository/userRepository.mjs";
// jwt 생성용
import jwt from "jsonwebtoken";

// 환경 설정 불러오기
import { config } from "../config/config.mjs";
import { pool } from "../repository/db.mjs";

// 회원가입 요청 처리 함수 (라우터 연결 예정)
export async function signup(req, res) {
  try {
    // 1. 요청 본문에서 사용자 정보 추출
    const {
      userid,
      userpw,
      name,
      hp,
      email,
      ssn1,
      ssn2,
      zipcode,
      address1,
      address2,
      address3,
    } = req.body; // 사용자가 보낸 데이터를 body에 담는다.
    // 중복 아이디 검사

    const existingUser = await userRepo.findByUserid(userid);
    if (existingUser) {
      return res.status(409).json({ message: "이미 사용 중인 아이디입니다" });
    }
    // 비밀번호를 bcryte로 암호화
    const hashedPw = await bcrypt.hash(userpw, 10);

    // 주민번호로 성별 계산하기
    let gender = "";
    const genderDigit = ssn2.charAt(0);
    if (genderDigit === "1" || genderDigit === "3") {
      gender = "남자";
    } else if (genderDigit === "2" || genderDigit === "4") {
      gender = "여자";
    }

    // DB에 저장할 사용자 객체 생성
    const newUser = {
      userid,
      userpw: hashedPw, // 암호화된 비밀번호 저장
      name,
      hp,
      email,
      gender, // 계산된 성별
      ssn1,
      ssn2,
      zipcode,
      address1,
      address2,
      address3,
    };

    console.log("새로운 유저 확인", newUser);
    console.log("newUser.gender의 길이:", newUser.gender.length);

    // 사용자 저장 요청 (DB에 insert 하기)
    await userRepo.createUser(newUser);

    // 성공/실패 응답
    res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    res.status(500).json({ error: "회원가입 실패", datails: error.message });
  }
}

// 아이디 중복확인 처리
export async function checkDuplicateId(req, res) {
  const { userid } = req.query;
  if (!userid) {
    return res.status(400).json({ message: "아이디를 입력하세요" });
  }
  const existingUser = await userRepo.findByUserid(userid);
  if (existingUser) {
    return res
      .status(200)
      .json({ exists: true, message: "이미 사용 중인 아이디입니다" });
  } else {
    return res
      .status(200)
      .json({ exists: false, message: "사용 가능한 아이디입니다" });
  }
}

// 로그인 처리 함수
export async function login(req, res) {
  try {
    const { userid, userpw } = req.body;
    // 1. DB에서 해당 사용자 정보 가져오기
    const user = await userRepo.findByUserid(userid);
    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 사용자입니다" });
    }
    // 2. 비밀번호 일치 확인 (암호화된 비밀번호와 비교)
    const isMatch = await bcrypt.compare(userpw, user.userpw);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다" });
    }
    // 3. jwt 토큰 생성
    const token = jwt.sign(
      { id: user.idx, userid: user.userid }, // payload : 토큰에 담길 정보
      config.jwt.secretKey, // 서명 비밀키
      { expiresIn: config.jwt.expiresInSec } // 만료 시간 설정
    );
    // 4. 토큰 전달
    res.status(200).json({
      token,
      userid: user.userid,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "로그인 실패", datails: error.message });
  }
}

// 로그인한 사용자 정보 응답
export function me(req, res) {
  const { userid, name } = req.user; //미들웨어에서 유효한 사용자면 req.user에 정보가 있음
  res.status(200).json({ userid, name });
}
