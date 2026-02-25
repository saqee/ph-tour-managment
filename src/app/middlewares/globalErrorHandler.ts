/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express"
import AppError from "../errorHelpers/Apperror.js"
export const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500
  let message = "something went wrong"
  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
  } else if (err instanceof Error) {
    statusCode = 500
    message = err.message
  }
  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: err.stack,
  })
}
