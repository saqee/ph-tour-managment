import express from "express"
import { checkAuth } from "../../middlewares/authMiddleware.js"
import { validateRequest } from "../../middlewares/validationRequest.js"
import { UserController } from "./user.controller.js"
import { createUserZodSchema, updateUserZodSchema } from "./user.validation.js"
import { Role } from "./user.interface.js"
const router = express.Router()

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser,
)
router.get(
  "/all-users",
  checkAuth("ADMIN", "SUPER_ADMIN"),
  UserController.getAllUsers,
)
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserController.updateUser,
)

export const UserRoutes = router
