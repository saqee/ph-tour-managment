import type { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync.js"
import { sendResponse } from "../../utils/sendResponse.js"
import { AuthService } from "./auth.service.js"

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthService.credentialsLogin(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user logged in successfully",
      data: loginInfo,
    })
  },
)
export const AuthControllers = {
  credentialsLogin,
}
