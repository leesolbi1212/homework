function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

// 랜덤 이름과 종류
const names = ["뿡이", "빵이", "뽀야", "뽀잉", "깜찍이", "뚜비"];
const types = ["Dog", "Cat", "Hamster"];

// 1. Pet 클래스
class Pet {
  constructor(name, kind, age) {
    this.name = name || names[Math.floor(Math.random() * names.length)];
    this.kind = kind;
    this.age = age || parseFloat((Math.random() * 3 + 0.5).toFixed(1));
    this.energy = 50;
    this.hunger = 50;
  }

  getInfo() {
    return `이름: ${this.name} / 종류: ${this.kind} / 나이: ${this.age.toFixed(
      1
    )}살 / 에너지: ${this.energy} / 배고픔: ${this.hunger}`;
  }

  eat() {
    this.hunger = clamp(this.hunger - 30);
    this.energy = clamp(this.energy + 10);
  }

  play() {
    this.energy = clamp(this.energy - 20);
    this.hunger = clamp(this.hunger + 20);
    this.age = parseFloat((this.age + 0.1).toFixed(1));
  }

  sleep() {
    this.energy = clamp(this.energy + 40);
    this.hunger = clamp(this.hunger + 10);
  }

  speak() {
    console.log("...");
  }
}

// 2. 자식 클래스들
class Dog extends Pet {
  constructor(name, age) {
    super(name, "Dog", age);
  }
  speak() {
    console.log(`[Dog] ${this.name}: 왈!`);
  }
}

class Cat extends Pet {
  constructor(name, age) {
    super(name, "Cat", age);
  }
  speak() {
    console.log(`[Cat] ${this.name}: 먀앍!`);
  }
}

class Hamster extends Pet {
  constructor(name, age) {
    super(name, "Hamster", age);
  }
  speak() {
    console.log(`[Hamster] ${this.name}: 찍!`);
  }
}

// 3. PetManager 클래스
class PetManager {
  constructor() {
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  showAllPets() {
    this.pets.forEach((pet) => {
      console.log(pet.getInfo());
    });
  }

  simulateDay(dayNum) {
    console.log(`--- Day ${dayNum} ---`);
    this.pets.forEach((pet) => {
      pet.speak();
      const actions = ["eat", "play", "sleep"];
      const action = actions[Math.floor(Math.random() * actions.length)];
      pet[action]();
      console.log(`${pet.name}은(는) ${action}을(를) 했습니다.`);
      console.log(pet.getInfo());
      console.log("  ");
    });
    console.log("----------------------\n");
  }
}

// 4. 실행
const manager = new PetManager();
const petClasses = [Dog, Cat, Hamster];
const petCount = Math.floor(Math.random() * 3) + 3;

for (let i = 0; i < petCount; i++) {
  const PetClass = petClasses[Math.floor(Math.random() * petClasses.length)];
  manager.addPet(new PetClass());
}

console.log("전체 펫 목록");
manager.showAllPets();

const dayCount = Math.floor(Math.random() * 3) + 3;
for (let day = 1; day <= dayCount; day++) {
  manager.simulateDay(day);
}
