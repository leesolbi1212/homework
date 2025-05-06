console.log("[TEST] signup.js loaded ✅");

import { baseUrl, checkDuplicateId, signupUser } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  let idCheckPassed = false;
  let ssnCheckPassed = false;

  const form = document.getElementById("signupForm");
  const useridInput = document.getElementById("userid");
  const userpwInput = document.getElementById("userpw");
  const userpwConfirmInput = document.getElementById("userpwConfirm");
  const pwMatchMsg = document.getElementById("pwMatchMsg");
  const ssn1Input = document.getElementById("ssn1");
  const ssn2Input = document.getElementById("ssn2");
  const checkIdBtn = document.getElementById("checkIdBtn");
  const checkSsnBtn = document.getElementById("checkSsnBtn");
  const goLoginBtn = document.getElementById("goLoginBtn");

  const useridRegex = /^[a-zA-Z0-9]{4,20}$/; // 영문+숫자만, 4~20자
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"'<>,.?/\\|~`]).{8,20}$/;

  // 아이디 중복확인
  checkIdBtn.addEventListener("click", async () => {
    const userid = useridInput.value.trim();
    if (!userid) return alert("아이디를 입력해주세요");

    try {
      const result = await checkDuplicateId(userid);
      alert(result.message);
      idCheckPassed = !result.exists;
    } catch (err) {
      alert("중복확인 중 오류 발생");
      idCheckPassed = false;
    }
  });

  useridInput.addEventListener("input", () => {
    if (idCheckPassed) {
      alert("아이디를 수정하셨습니다. 다시 중복확인을 해주세요.");
      idCheckPassed = false;
    }
  });

  userpwConfirmInput.addEventListener("input", () => {
    if (userpwInput.value === userpwConfirmInput.value) {
      pwMatchMsg.textContent = "일치합니다";
      pwMatchMsg.style.color = "green";
    } else {
      pwMatchMsg.textContent = "비밀번호가 일치하지 않습니다";
      pwMatchMsg.style.color = "red";
    }
  });

  checkSsnBtn.addEventListener("click", () => {
    const ssn1 = ssn1Input.value.trim();
    const ssn2 = ssn2Input.value.trim();
    if (ssn1.length !== 6 || ssn2.length !== 7) {
      alert("주민등록번호 13자리를 정확히 입력하세요");
      ssnCheckPassed = false;
      return;
    }

    const ssn = ssn1 + ssn2;
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(ssn[i]) * weights[i];
    }

    let checkDigit = 11 - (sum % 11);
    if (checkDigit === 10) checkDigit = 0;
    if (checkDigit === 11) checkDigit = 1;

    if (checkDigit === parseInt(ssn[12])) {
      alert("주민등록번호 검증 완료!");
      ssnCheckPassed = true;

      const genderDigit = parseInt(ssn2.charAt(0));
      let gender = "";
      if (genderDigit === 1 || genderDigit === 3) gender = "남자";
      else if (genderDigit === 2 || genderDigit === 4) gender = "여자";

      let genderInput = document.getElementById("gender");
      if (!genderInput) {
        genderInput = document.createElement("input");
        genderInput.type = "hidden";
        genderInput.id = "gender";
        genderInput.name = "gender";
        form.appendChild(genderInput);
      }
      genderInput.value = gender;
    } else {
      alert("유효하지 않은 주민등록번호입니다.");
      ssnCheckPassed = false;
    }
  });

  [ssn1Input, ssn2Input].forEach((input) =>
    input.addEventListener("input", () => {
      if (ssnCheckPassed) {
        alert("주민등록번호를 수정하셨습니다. 다시 검증해주세요.");
        ssnCheckPassed = false;
      }
    })
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userid = useridInput.value.trim();
    const userpw = userpwInput.value.trim();
    const userpwConfirm = userpwConfirmInput.value.trim();

    if (!useridRegex.test(userid))
      return alert("아이디는 영문과 숫자 조합으로 4~20자 이내여야 합니다.");
    if (!passwordRegex.test(userpw))
      return alert(
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자여야 합니다."
      );
    if (userpw !== userpwConfirm)
      return alert("비밀번호가 서로 일치하지 않습니다.");
    if (!idCheckPassed) return alert("아이디 중복확인을 해주세요.");
    if (!ssnCheckPassed) return alert("주민등록번호 검증을 해주세요.");

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const res = await signupUser(data);
      const result = await res.json();
      if (res.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        location.href = "/login.html";
      } else {
        alert(result.message || "회원가입 실패");
      }
    } catch (err) {
      alert("회원가입 중 오류 발생");
    }
  });

  goLoginBtn.addEventListener("click", () => {
    location.href = "/login.html";
  });
});
