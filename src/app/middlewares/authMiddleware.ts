import HttpStatus from "http-status"
import { envVars } from "../config/env.js"
import AppError from "../errorHelpers/Apperror.js"
import { verifyToken } from "../utils/token.js"
export const checkAuth =
  (...authRoles: string[]) =>
  (req, res, next) => {
    const accessToken = req.headers.authorization
    if (!accessToken) {
      throw new AppError(HttpStatus.FORBIDDEN, "no token found")
    }
    const verifiedToken = verifyToken(accessToken, envVars.SECRET)

    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(
        HttpStatus.FORBIDDEN,
        "you are not permitted to view this route",
      )
    }
    req.user = verifiedToken
    next()
  }
