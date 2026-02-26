import bcrypt from "bcryptjs"
import httpStatus from "http-status"
import { envVars } from "../../config/env.js"
import AppError from "../../errorHelpers/Apperror.js"
import { generateToken } from "../../utils/token.js"
import type { IUser } from "../user/user.interface.js"
import { User } from "../user/user.model.js"

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload
  const isUserExists = await User.findOne({ email })
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exists")
  }
  const isPasswordMatch = await bcrypt.compare(password, isUserExists.password)
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "password  not match")
  }
  /* const accessToken = jwt.sign(
    {
      email: isUserExists.email,
      userId: isUserExists._id,
      role: isUserExists.role,
    },
    envVars.SECRET,
    { expiresIn: "14d" },
  ) */
  const accessToken = generateToken(
    {
      email: isUserExists.email,
      userId: isUserExists._id,
      role: isUserExists.role,
    },
    envVars.SECRET,
    { expiresIn: "14d" },
  )
  return {
    accessToken,
  }
}

export const AuthService = {
  credentialsLogin,
}
