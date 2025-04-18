const input = "0010113068518";
let ssn = input.split("").map(Number);

let ssnpop = ssn.pop();
//console.log(ssnpop);
//console.log(ssn);

const check = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
let sum = 0;

for (let i = 0; i < ssn.length; i++) {
  sum += ssn[i] * check[i];
}
//console.log(sum);
const check2 = 11 - (sum % 11);
//console.log(check2);

if (check2 == 10) {
  check2 = 0;
} else if (check2 == 11) {
  check2 = 1;
}

if (check2 == ssnpop) {
  alert("유효한 주민번호입니다.");
} else {
  alert("유효한 주민번호가 아닙니다.");
}
