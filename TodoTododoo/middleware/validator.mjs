// 요청(req.body 등)에 필수 데이터가 제대로 들어왔는지 체크 (유효성 검사)

// 회원가입 요청에 필요한 필드가 빠졌는지 확인하기
export function validateSignup(req, res, next) {
  const { userid, userpw, name, email } = req.body;

  // 필수 항목 누락 시 400 응답
  if (!userid || !userpw || !name || !email) {
    return res.status(400).json({ message: "필수 입력값이 누락되었습니다." });
  }
  next(); // 통과했으면 다음으로
}

// 할 일 등록 요청에서 title이 비었는지 확인
export function validateTodo(req, res, next) {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "제목을 필수로 입력하세요" });
  }
  next();
}
