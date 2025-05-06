export const baseUrl =
  location.hostname === "localhost" && location.port === "5500"
    ? "http://localhost:5500"
    : "";

//  공통 헤더에 Authorization 추가
function authHeader(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

//  1. 할 일 등록
export async function createTodo(token, title, content) {
  const res = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

//  2. 전체 할 일 조회 (개발자용)
export async function getAllTodos(token) {
  const res = await fetch(`${baseUrl}/todos/all`, {
    headers: authHeader(token),
  });
  return res.json();
}

//  3. 내 할 일 조회
export async function getMyTodos(token) {
  const res = await fetch(`${baseUrl}/todos/me`, {
    headers: authHeader(token),
  });
  if (res.status === 401) {
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    localStorage.clear();
    location.href = "/login.html";
    throw new Error("Unauthorized");
  }
  return res.json();
}

//  4. 할 일 수정
export async function updateTodo(token, id, title, content) {
  const res = await fetch(`${baseUrl}/todos/${id}`, {
    method: "PATCH",
    headers: authHeader(token),
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

//  5. 할 일 삭제
export async function deleteTodo(token, id) {
  const res = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  return res.json();
}

//  6. 완료 상태 토글
export async function toggleDone(token, id) {
  const res = await fetch(`${baseUrl}/todos/${id}/done`, {
    method: "PATCH",
    headers: authHeader(token),
  });
  return res.json();
}

// 아이디 중복확인 API 호출
export async function checkDuplicateId(userid) {
  const res = await fetch(`${baseUrl}/auth/check-id?userid=${userid}`);
  return res.json(); // { exists: true/false, message: string }
}

// 회원가입 API 호출
export async function signupUser(data) {
  const res = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
}
