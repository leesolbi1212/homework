import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getMyTodos,
  updateTodo,
} from "../controller/todoController.mjs";
import { isAuth } from "../middleware/auth.mjs";
import { toggleDone } from "../controller/todoController.mjs";

const router = Router();

//로그인 한 사용자만 등록 가능
router.post("/", isAuth, createTodo);

// 전체 조회
router.get("/", getAllTodos);

// 나의 할 일만 조회
router.get("/me", isAuth, getMyTodos);

// 할 일 수정
router.patch("/:id", isAuth, updateTodo);

// 할 일 삭제
router.delete("/:id", isAuth, deleteTodo);

// 할 일 체크
router.patch("/done/:id", isAuth, toggleDone);

export default router;
