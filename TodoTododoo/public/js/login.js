document.addEventListener("DOMContentLoaded", () => {
  console.log("[TEST] login.js 연결됨");

  const form = document.getElementById("loginForm");
  const useridInput = document.getElementById("userid");
  const userpwInput = document.getElementById("userpw");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userid = useridInput.value.trim();
    const userpw = userpwInput.value.trim();

    if (!userid || !userpw) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, userpw }),
      });

      const result = await res.json();

      if (res.ok) {
        // 로그인 성공 → 토큰 저장 후 리다이렉트
        localStorage.setItem("token", result.token);
        localStorage.setItem("userid", result.userid);
        localStorage.setItem("name", result.name);
        alert(`${result.name}님 환영합니다!`);
        location.href = "/mytodos";
      } else {
        alert(result.message || "로그인 실패");
      }
    } catch (err) {
      alert("로그인 중 오류 발생");
    }
  });
});
