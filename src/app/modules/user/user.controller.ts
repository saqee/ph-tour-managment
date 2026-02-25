import type { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync.ts"
import { sendResponse } from "../../utils/sendResponse.ts"
import { UserService } from "./user.service.ts"
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body)
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "user created successfully",
      data: user,
      success: true,
    })
  },
)

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers()

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "all user successfully fetched",
      data: result.data,
      meta: result.meta,
      success: true,
    })
    /* res.status(200).json({
      message: "all user successfully fetched",
      users,
    }) */
  },
)

export const UserController = {
  createUser,
  getAllUsers,
}
