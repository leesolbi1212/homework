// 주민번호 검증 여부를 저장할 전역 변수
let isSSNVerified = false;
let isValidSSN = false;

function sendit() {
  const userid = document.getElementById("userid");
  const userpw = document.getElementById("userpw");
  const userpw_re = document.getElementById("userpw_re");
  const name = document.getElementById("name");
  const hp = document.getElementById("hp");
  const email = document.getElementById("email");
  const ssn1 = document.getElementById("ssn1");
  const ssn2 = document.getElementById("ssn2");
  const ssnn = document.getElementById("ssnn");
  const zipcode = document.getElementById("zipcode");
  const address = document.getElementById("address");
  const address2 = document.getElementById("address2");
  const address3 = document.getElementById("address3");

  // 아이디 검사
  if (userid.value === "") {
    alert("아이디를 입력하세요.");
    userid.focus();
    return false;
  }
  if (!expIdText.test(userid.value)) {
    alert("아이디는 4~20자의 영문자 및 숫자로 입력하세요!");
    userid.focus();
    return false;
  }

  // 비밀번호 검사
  if (userpw.value === "") {
    alert("비밀번호를 입력하세요.");
    userpw.focus();
    return false;
  }
  if (!expPwText.test(userpw.value)) {
    alert("비밀번호는 8~20자 영문자, 숫자, 특수문자 조합으로 입력하세요!");
    userpw.focus();
    return false;
  }
  if (userpw.value !== userpw_re.value) {
    alert("비밀번호가 일치하지 않습니다🥲");
    userpw_re.focus();
    return false;
  }

  // 이름 검사
  if (!expNameText.test(name.value)) {
    alert("이름은 2~10자의 한글만 입력 가능합니다.");
    name.focus();
    return false;
  }

  // 휴대폰 번호 검사
  if (!expHpText.test(hp.value)) {
    alert("휴대폰 번호 형식이 일치하지 않습니다.\n - 하이픈을 꼭 입력하세요.");
    hp.focus();
    return false;
  }

  // 이메일 검사
  if (!expEmailText.test(email.value)) {
    alert("이메일 형식이 올바르지 않습니다.");
    email.focus();
    return false;
  }

  // 주민번호 검증 여부 확인
  if (!isSSNVerified) {
    alert("주민등록번호 검증을 먼저 진행해주세요.");
    ssn1.focus();
    return false;
  }

  // 주민번호 유효성 확인
  if (!isValidSSN) {
    alert("유효한 주민등록번호를 입력해주세요.");
    ssn1.focus();
    return false;
  }

  alert("회원가입이 완료되었습니다!");
  return true;
}

const expIdText = /^[A-Za-z0-9]{4,20}$/;
const expPwText =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
const expNameText = /^[가-힣]{2,10}$/;
const expHpText = /^\d{3}-\d{3,4}-\d{4}$/;
const expEmailText = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const expSsn1Text = /^\d{6}$/;
const expSsn2Text = /^\d{7}$/;
const expSsnText = /^\d{13}$/;
const expZipcodeText = /^\d{5}$/;
const expAddressText = /^[가-힣0-9\s]+$/;
const expAddress2Text = /^[가-힣0-9\s]+$/;
const expAddress3Text = /^[가-힣0-9\s]+$/;

// 주민번호 검증 함수
function validateSSN() {
  const ssn1Value = document.getElementById("ssn1").value;
  const ssn2Value = document.getElementById("ssn2").value;

  // 주민번호 형식 검사
  if (!expSsn1Text.test(ssn1Value) || !expSsn2Text.test(ssn2Value)) {
    alert("주민등록번호 형식이 올바르지 않습니다.");
    isSSNVerified = false;
    isValidSSN = false;
    return false;
  }

  const ssn = ssn1Value + ssn2Value;
  
  // 가중치 계산
  const weights = [2,3,4,5,6,7,8,9,2,3,4,5];
  let sum = 0;
  
  for (let i = 0; i < 12; i++) {
    sum += parseInt(ssn.charAt(i)) * weights[i];
  }

  // 검증번호 계산
  let checkNum = 11 - (sum % 11);
  if (checkNum >= 10) checkNum %= 10;

  // 검증
  isSSNVerified = true;
  if (checkNum === parseInt(ssn.charAt(12))) {
    alert("유효한 주민등록번호입니다.");
    isValidSSN = true;
    
    // 검증 성공 시 시각적 피드백
    document.getElementById("ssn1").style.borderColor = "#4CAF50";
    document.getElementById("ssn2").style.borderColor = "#4CAF50";
    return true;
  } else {
    alert("유효하지 않은 주민등록번호입니다.");
    isValidSSN = false;
    
    // 검증 실패 시 시각적 피드백
    document.getElementById("ssn1").style.borderColor = "#ff3333";
    document.getElementById("ssn2").style.borderColor = "#ff3333";
    return false;
  }
}

// 주민번호 입력 필드 값이 변경될 때마다 검증 상태 초기화
function resetSSNVerification() {
  isSSNVerified = false;
  isValidSSN = false;
  document.getElementById("ssn1").style.borderColor = "";
  document.getElementById("ssn2").style.borderColor = "";
}

// 페이지 로드 시 이벤트 리스너 등록
window.onload = function() {
  // 주민번호 입력 필드에 이벤트 리스너 추가
  document.getElementById("ssn1").addEventListener("input", resetSSNVerification);
  document.getElementById("ssn2").addEventListener("input", resetSSNVerification);

  // 주민등록번호 검증 버튼에 이벤트 리스너 추가
  const ssnButton = document.querySelector('button[onclick="validateSSN()"]');
  if (ssnButton) {
    ssnButton.onclick = function(e) {
      e.preventDefault(); // 폼 제출 방지
      validateSSN();
    };
  }
};
