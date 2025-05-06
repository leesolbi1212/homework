document.addEventListener("DOMContentLoaded", () => {
  console.log("[TEST] index.js 작동 확인 ✅");

  const token = localStorage.getItem("token");

  // 로그인 상태면 자동으로 나의 할 일 페이지로 이동
  if (token) {
    location.href = "/mytodos";
    return;
  }

  //  로그인/회원가입 버튼 클릭 이벤트
  const loginBtn = document.getElementById("goLoginBtn");
  const signupBtn = document.getElementById("goSignupBtn");

  loginBtn.addEventListener("click", () => {
    location.href = "/login";
  });

  signupBtn.addEventListener("click", () => {
    location.href = "/signup";
  });
});
