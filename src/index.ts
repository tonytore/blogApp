import express from "express";
import { userRouter } from "./user/user.route";
import { postRouter } from "./posts/post.route";
import commentRouter from "./comment/comment.router";
import tagRouter from "./tag/tag.router";
import appConfig from "./config/app_configs";
import categoryRouter from "./category/category.router";
import errorHandler from "./utils/error/error_handler";
import notFoundHandler from "./utils/error/not_found_error";

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);
app.use("/comment", commentRouter);
app.use("/tag", tagRouter);
app.use("/category", categoryRouter);


app.use(notFoundHandler)
app.use(errorHandler)

app.listen(appConfig.PORT, () => {
  console.log(`server is running on port http://localhost:${appConfig.PORT}`);
});
