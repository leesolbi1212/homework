// ✅ DOMContentLoaded 안에 모든 로직을 넣으면 순서 문제 방지됨

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".header__menu__item");

  function updateActiveMenu() {
    let currentId = "";

    sections.forEach((section) => {
      const offset = section.offsetTop;
      const height = section.offsetHeight;

      if (
        window.scrollY >= offset - 200 &&
        window.scrollY < offset + height - 200
      ) {
        currentId = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentId}`) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveMenu);
  updateActiveMenu();

  // ✅ 필터 기능
  const categories = document.querySelector(".categories");
  const projectsContainer = document.querySelector(".projects");
  const projects = document.querySelectorAll(".project__card");
  const projectCount = document.querySelector(".project__count");

  categories.addEventListener("click", (e) => {
    const filter = e.target.dataset.category;
    if (!filter) return;

    // 버튼 스타일 업데이트
    const prevSelected = document.querySelector(".category--selected");
    if (prevSelected) prevSelected.classList.remove("category--selected");
    e.target.classList.add("category--selected");

    // 필터링 실행
    let visibleCount = 0;
    projects.forEach((project) => {
      if (filter === "all" || project.dataset.type === filter) {
        project.style.display = "block";
        visibleCount++;
      } else {
        project.style.display = "none";
      }
    });

    // 스무스하게 숫자 증가 효과
    let currentCount = 0;
    const interval = setInterval(() => {
      if (currentCount < visibleCount) {
        currentCount++;
        projectCount.textContent = `총 ${currentCount}개`;
      } else {
        clearInterval(interval);
      }
    }, 30);

    // 애니메이션 효과
    projectsContainer.classList.add("anim-out");
    setTimeout(() => {
      projectsContainer.classList.remove("anim-out");
    }, 300);
  });

  // ✅ home 배경 점점 어두워지게
  const homeSection = document.querySelector("#home");
  const homeHeight = homeSection.offsetHeight;

  document.addEventListener("scroll", () => {
    const ratio = Math.min(window.scrollY / homeHeight, 1);
    homeSection.style.background = `linear-gradient(135deg, rgba(10,10,10,${ratio}) 0%, rgba(32,38,50,1) 100%)`;
  });

  // ✅ 커리어 타임라인 날짜 위치 반응형 개선
  const isMobile = window.innerWidth <= 768;
  const careerDates = document.querySelectorAll(".career__date");

  careerDates.forEach((date) => {
    if (isMobile) {
      date.style.left = "0";
      date.style.transform = "none";
      date.style.marginLeft = "1rem";
    } else {
      date.style.left = "50%";
      date.style.transform = "translateX(-50%)";
      date.style.marginLeft = "0";
    }
  });
});
