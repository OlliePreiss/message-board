const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.get("/", userController.userListGet);
userRouter.get("/create", userController.userCreateGet);
userRouter.post("/create", userController.userCreatePost);
userRouter.get("/:id/update", userController.userUpdateGet);
userRouter.post("/:id/update", userController.userUpdatePost);
userRouter.post("/:id/delete", userController.userDeletePost);
userRouter.get("/search", userController.userSearchGet);


module.exports = userRouter;
