import express from "express";
import authRouter from "./router/authRouter.mjs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use("/auth", authRouter);

console.log("포트번호:", config.host.port);

app.listen(config.host.port, () => {
  console.log("서버 실행 즁~!");
});

console.log("app.mjs 시작됨!");
