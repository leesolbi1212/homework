const fs = require("fs");

const user = fs.readFileSync("./과제/game.txt").toString().trim();

const options = ["가위", "바위", "보"];
const randomIndex = Math.floor(Math.random() * options.length);
const computer = options[randomIndex];

let result = "";

if (user === computer) {
  result = "무승부!";
} else if (
  (user === "가위" && computer === "보") ||
  (user === "바위" && computer === "가위") ||
  (user === "보" && computer === "바위")
) {
  result = "당신의 승리!";
} else if (
  (user === "가위" && computer === "바위") ||
  (user === "바위" && computer === "보") ||
  (user === "보" && computer === "가위")
) {
  result = "컴퓨터의 승리!";
} else {
  result = "입력이 잘못되었습니다.";
}

console.log("당신 : ", user);
console.log("컴퓨터 :", computer);
console.log("결과 : ", result);
