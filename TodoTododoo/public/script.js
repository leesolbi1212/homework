document.addEventListener("DOMContentLoaded", () => {
  ////////////////////// 아이디 중복확인 로직 //////////////////////

  let idChckPassed = false;
  const useridInput = document.getElementById("userid");
  const checkIdBtn = document.getElementById("checkIdBtn");

  checkIdBtn.addEventListener("click", async () => {
    const userid = useridInput.value.trim();
    if (!userid) {
      alert("아이디를 입력해주세요");
      return;
    }
    try {
      const res = await fetch(`/auth/check-id?userid=${userid}`);
      const data = await res.json();
      if (data.exists) {
        alert("이미 사용 중인 아이디입니다");
        idChckPassed = false;
      } else {
        alert("사용 가능한 아이디입니다");
        idChckPassed = true;
      }
    } catch (err) {
      alert("중복확인 중 에러 발생");
      idChckPassed = false;
    }
  });

  useridInput.addEventListener("input", () => {
    if (idChckPassed) {
      alert("아이디를 다시 입력한 경우, 중복확인을 다시 해주세요");
      idChckPassed = false;
    }
  });

  ////////////////////// 주민번호 검증 및 성별 자동추론 //////////////////////

  let ssnCheckPassed = false;
  const ssn1Input = document.getElementById("ssn1");
  const ssn2Input = document.getElementById("ssn2");
  const checkSsnBtn = document.getElementById("checkSsnBtn");

  checkSsnBtn.addEventListener("click", () => {
    const ssn1 = ssn1Input.value.trim();
    const ssn2 = ssn2Input.value.trim();

    if (ssn1.length !== 6 || ssn2.length !== 7) {
      alert("주민등록번호 13자리를 정확히 입력하세요");
      ssnCheckPassed = false;
      return;
    }

    const fullssn = ssn1 + ssn2;
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(fullssn[i]) * weights[i];
    }

    const remainder = sum % 11;
    let checkDigit = 11 - remainder;
    if (checkDigit === 10) checkDigit = 0;
    if (checkDigit === 11) checkDigit = 1;

    const isValid = checkDigit === parseInt(fullssn[12]);

    if (isValid) {
      alert("주민등록번호 검증이 완료되었습니다 :)");
      ssnCheckPassed = true;

      // 성별 자동 추출
      const genderCode = parseInt(ssn2.charAt(0));
      let gender = "";
      if (genderCode === 1 || genderCode === 3) gender = "남자";
      else if (genderCode === 2 || genderCode === 4) gender = "여자";

      let genderInput = document.getElementById("hidden-gender");
      if (!genderInput) {
        genderInput = document.createElement("input");
        genderInput.type = "hidden";
        genderInput.id = "hidden-gender";
        genderInput.name = "gender";
        document.getElementById("signupForm").appendChild(genderInput);
      }
      genderInput.value = gender;
    } else {
      alert("유효하지 않은 주민등록번호입니다 ㅠㅠ");
      ssnCheckPassed = false;
    }
  });

  ssn1Input.addEventListener("input", () => {
    if (ssnCheckPassed) {
      alert("주민등록번호 수정하셨어요? 다시 검증하세요");
      ssnCheckPassed = false;
    }
  });
  ssn2Input.addEventListener("input", () => {
    if (ssnCheckPassed) {
      alert("주민등록번호 수정하셨어요? 다시 검증하세요");
      ssnCheckPassed = false;
    }
  });

  ////////////////////// 회원가입 제출 전 검증 //////////////////////

  const signupForm = document.getElementById("signupForm");
  signupForm.addEventListener("submit", (e) => {
    if (!idChckPassed) {
      e.preventDefault();
      alert("아이디 중복확인을 먼저 해주세요");
    } else if (!ssnCheckPassed) {
      e.preventDefault();
      alert("주민등록번호 검증을 먼저 해주세요");
    }
  });

  ////////////////////// 할 일 완료 시 취소선 적용 //////////////////////

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("todo-check")) {
      const li = e.target.closest(".todo-item");
      const title = li.querySelector(".todo-title");
      const content = li.querySelector(".todo-content");

      if (e.target.checked) {
        title.classList.add("checked");
        content.classList.add("checked");
      } else {
        title.classList.remove("checked");
        content.classList.remove("checked");
      }
    }
  });
});
