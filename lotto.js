const lotto = [];

while (lotto.length < 6) {
  const num = Math.floor(Math.random() * 45) + 1;

  let isDuplicate = false;

  for (let i = 0; i < lotto.length; i++) {
    if (lotto[i] === num) {
      isDuplicate = true;
      break;
    }
  }

  if (isDuplicate === false) {
    lotto.push(num);
  }
}
lotto.sort(function (a, b) {
  return a - b;
});

console.log("로또번호 추천 : ", lotto);
