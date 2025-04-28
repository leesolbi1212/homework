// 회원가입, 로그인 기능을 담당하는 컨트롤러 파일
// bcrypt로 비밀번호 암호화, jwt로 로그인 성공 시 토큰 발급

import fs from "fs"; //파일 입출력
import path from "path"; // 경로 설정
import { fileURLToPath } from "url"; // __dirname 사용을 위한 설정
import bcrypt from "bcrypt"; // 비밀번호 암호화 패키지
import jwt from "jsonwebtoken"; //jwt 토큰 발급 패키지
import { config } from "../config.mjs"; // 환경변수 (jwt secret, saltRounds 등)

// __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// user.json 파일 경로
const dataPath = path.join(__dirname, "../data/users.json");

// user.json에서 사용자 목록 읽어오는 함수
function readUsers() {
  if (!fs.existsSync(dataPath)) return []; //파일이 없으면 빈 배열 리턴
  const data = fs.readFileSync(dataPath, "utf-8"); // utf-8로 인코딩 후 파일 읽기
  return JSON.parse(data || "[]"); //JSON 형식으로 변환
}

// 사용자 목록을 user.json에 저장하는 함수
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2)); //들여쓰기 저장
}

// 회원가입 기능

export async function signup(req, res) {
  const { userid, password, name, email } = req.body; //프론트에서 넘어온 값 꺼내기

  // 빈 값이 있는지 확인
  if (!userid || !password || !name || !email) {
    return res.status(400).json({ message: "모든 항목을 입력해주세요!" });
  }

  const users = readUsers(); //기존회원목록 찾기
  const existUser = users.find((u) => u.userid === userid); //같은 아이디가 있는지 확인

  if (existUser) {
    return res.status(409).json({ message: "이미 존재하는 아이디입니다!" });
  }

  // bcrypt 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);

  // 새 회원 추가하기
  users.push({ userid, password: hashedPassword, name, email });
  writeUsers(users); // 저장

  res.status(201).json({ message: "회원가입이 완료되었습니다." });
}

// 로그인 기능
export async function login(req, res) {
  const { userid, password } = req.body; //프론트에서 넘어온 값 꺼내기

  if (!userid || !password) {
    return res
      .status(400)
      .json({ message: "아이디와 비밀번호를 입력해주세요" });
  }

  const users = readUsers(); //회원목록 읽기
  const user = users.find((u) => u.userid === userid); //아이디로 유저 찾기

  if (!user) {
    return res
      .status(401)
      .json({ message: "아이디 또는 비밀번호가 틀렸습니다" });
  }

  // bcrypt로 비밀번호 비교 (암호화된 비번, 입력한 비번)
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "아이디 또는 비밀번호가 틀렸습니다" });
  }

  // 로그인 성공 -> jwt 토큰 발급

  const token = jwt.sign(
    { userid: user.userid, name: user.name }, //payload (토큰 안에 들어갈 정보)
    config.jwt.secretKey, // 시크릿 키 (env에 있음)
    { expiresIn: config.jwt.expiresInSec } //만료 시간 (1시간)
  );
  res.status(200).json({ message: "로그인 성공", token }); //토큰과 함께 성공 응답
}
