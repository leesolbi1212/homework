document.addEventListener("DOMContentLoaded", () => {
  console.log("[TEST] index.js 작동 확인 ✅");

  const token = localStorage.getItem("token");

  //  로그인/회원가입 버튼 클릭 이벤트
  const loginBtn = document.getElementById("goLoginBtn");
  const signupBtn = document.getElementById("goSignupBtn");
  const myTodosBtn = document.getElementById("goMyTodosBtn");

  // 로그인 상태일 때만 나의 할 일 버튼 보여주기
  if (token) {
    myTodosBtn.style.display = "inline-block";
  } else {
    myTodosBtn.style.display = "none";
  }

  loginBtn.addEventListener("click", () => {
    location.href = "/login";
  });

  signupBtn.addEventListener("click", () => {
    location.href = "/signup";
  });

  myTodosBtn.addEventListener("click", () => {
    location.href = "/mytodos";
  });
});
