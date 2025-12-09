import express, { Request, Response, NextFunction } from "express";
import { userRouter } from "./user/user.route";
import { postRouter } from "./posts/post.route";
import commentRouter from "./comment/comment.router";
import tagRouter from "./tag/tag.router";
import appConfig from "./config/app_configs";
import categoryRouter from "./category/category.router";
import errorHandler from "./utils/error/error_handler";
import notFoundHandler from "./utils/error/not_found_error";
import fs from "node:fs";
import { logger } from "./utils/logger/logger";

const app = express();

app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  const log = `\n [${Date.now()}] ${req.method} ${req.path}`;
  fs.appendFileSync("log.txt", log, "utf-8");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/posts", postRouter);
app.use("/comment", commentRouter);
app.use("/tag", tagRouter);
app.use("/category", categoryRouter);

app.use(notFoundHandler);
app.use(errorHandler);

// const PORT = process.env.PORT || appConfig.PORT;

app.listen(appConfig.PORT, () => {
  logger.info(`server is running on port http://localhost:${appConfig.PORT}`);
});
