import * as todoRepo from "../repository/todoRepository.mjs";
import { pool } from "../repository/db.mjs";

// 할 일 등록하는 함수
export async function createTodo(req, res) {
  // console.log(req.user);
  const userId = req.user.id; //isAuth 미들웨어에서 넣어줌
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: "제목은 필수입니다" });

  try {
    await todoRepo.insertTodo({ title, content, user_id: userId });
    res.status(201).json({ message: "할 일 등록 완료" });
  } catch (err) {
    res.status(500).json({ error: "할 일 등록 실패", detail: err.message });
  }
}
// 할 일 전체 조회하는 함수 (개발자용)
export async function getAllTodos(req, res) {
  try {
    const todos = await todoRepo.findAllTodos(); // 모든 할 일 불러오기
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "할 일 조회 실패", detail: err.message });
  }
}

// 내 할 일만 조회
export async function getMyTodos(req, res) {
  try {
    const userId = req.user.id;
    const todos = await todoRepo.findTodosByUserId(userId);
    res.status(200).json(todos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "내 할 일 조회 실패", detail: err.message });
  }
}

// 할 일 수정 (로그인한 사용자의 글만 수정 가능)
export async function updateTodo(req, res) {
  const userId = req.user.id; //로그인한 사용자 id
  const todoId = req.params.id; // 수정할 할 일 id
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ message: "제목은 필수입니다" });
  }

  try {
    const update = await todoRepo.updateTodoById({
      id: todoId,
      title,
      content,
      userId,
    });

    if (!update) {
      return res
        .status(403)
        .json({ message: "수정권한 또는 할 일이 없습니다" });
    }
    res.status(200).json({ message: "할 일 수정 완료" });
  } catch (err) {
    console.log("할 일 수정 실패:", err);
    res.status(500).json({ error: "할 일 수정 실패", datail: err.message });
  }
}

// 할 일 삭제
export async function deleteTodo(req, res) {
  const userId = req.user.id;
  const todoId = req.params.id;

  try {
    const deleted = await todoRepo.deleteTodoById({ id: todoId, userId });
    if (!deleted) {
      return res
        .status(403)
        .json({ message: "삭제 권한 또는 할 일이 존재하지 않습니다" });
    }
    res.status(200).json({ message: "할 일 삭제 완료" });
  } catch (err) {
    console.log("할 일 삭제 실패", err);
    res.status(500).json({ error: "할 일 삭제 실패", datail: err.message });
  }
}

// 완료 체크 토글 기능
export async function toggleDone(req, res) {
  const userId = req.user.id;
  const todoId = req.params.id;

  try {
    const update = await todoRepo.toggleTodoDone({ id: todoId, userId });
    if (!update) {
      returnres
        .status(403)
        .json({ message: "수정 권한 또는 할 일이 없습니다" });
    }
    res.status(200).json({ message: "할 일 완료 상태 변경됨" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "할 일 완료 체크 실패", datail: err.message });
  }
}
