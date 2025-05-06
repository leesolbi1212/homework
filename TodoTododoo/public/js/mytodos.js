import {
  createTodo,
  getMyTodos,
  updateTodo,
  deleteTodo,
  toggleDone,
} from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todoList");
  const todoForm = document.getElementById("todoForm");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  const token = localStorage.getItem("token");

  if (!token) {
    alert("로그인이 필요합니다");
    location.href = "/login.html";
    return;
  }

  const name = localStorage.getItem("name");
  const welcomeMsg = document.getElementById("welcomeMsg");
  if (name && welcomeMsg) {
    welcomeMsg.textContent = `${name}님의 할 일 목록`;
  }

  async function loadTodos() {
    try {
      const todos = await getMyTodos(token);
      renderTodos(todos);
    } catch (err) {
      alert("할 일 조회 실패");
    }
  }

  function renderTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.classList.add("todo-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done === 1;
      checkbox.addEventListener("change", () => {
        toggleDone(token, todo.id).then(loadTodos);
      });

      const title = document.createElement("strong");
      title.textContent = todo.title;

      const content = document.createElement("p");
      content.textContent = todo.content;

      if (todo.done === 1) {
        title.style.textDecoration = "line-through";
        content.style.textDecoration = "line-through";
      }

      const editBtn = document.createElement("button");
      editBtn.textContent = "수정";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.addEventListener("click", () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        deleteTodo(token, todo.id).then(loadTodos);
      });

      // 수정 버튼 클릭 시
      editBtn.addEventListener("click", () => {
        const titleInput = document.createElement("input");
        titleInput.value = todo.title;

        const contentInput = document.createElement("input");
        contentInput.value = todo.content;

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "저장";

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "취소";

        // li 초기화 후 수정모드 구성
        li.innerHTML = "";
        li.appendChild(checkbox);
        li.appendChild(titleInput);
        li.appendChild(contentInput);
        li.appendChild(saveBtn);
        li.appendChild(cancelBtn);

        saveBtn.addEventListener("click", async () => {
          const newTitle = titleInput.value.trim();
          const newContent = contentInput.value.trim();
          if (!newTitle) return alert("제목은 필수입니다");

          try {
            await updateTodo(token, todo.id, newTitle, newContent);
            loadTodos(); // 다시 목록 불러오기
          } catch (err) {
            alert("수정 실패");
          }
        });

        cancelBtn.addEventListener("click", () => {
          loadTodos(); // 원래 상태로 복구
        });
      });

      // 기본 화면에 요소 추가
      li.appendChild(checkbox);
      li.appendChild(title);
      li.appendChild(content);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }

  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title) return alert("제목을 입력하세요");

    try {
      const res = await createTodo(token, title, content);
      if (res.message) {
        titleInput.value = "";
        contentInput.value = "";
        loadTodos();
      } else {
        alert(res.message || "등록 실패");
      }
    } catch (err) {
      alert("등록 중 오류 발생");
    }
  });

  async function editTodoFn(todo) {
    const newTitle = prompt("새 제목:", todo.title);
    const newContent = prompt("새 내용:", todo.content);
    if (!newTitle) return;

    try {
      await updateTodo(token, todo.id, newTitle, newContent);
      loadTodos();
    } catch (err) {
      alert("수정 실패");
    }
  }

  window.logout = function () {
    localStorage.removeItem("token");
    location.href = "/login.html";
  };

  loadTodos();
});
