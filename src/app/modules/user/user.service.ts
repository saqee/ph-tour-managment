import bcrypt from "bcryptjs"
import httpStatus from "http-status"
import type { JwtPayload } from "jsonwebtoken"
import AppError from "../../errorHelpers/Apperror.js"
import { Role, type IAuthProvider, type IUser } from "./user.interface.js"
import { User } from "./user.model.js"
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload
  const isUserxits = await User.findOne({ email })
  if (isUserxits) {
    throw new AppError(httpStatus.BAD_REQUEST, "user already exists")
  }
  const hashPassword = await bcrypt.hash(password, 10)

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email!,
  }
  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest,
  })
  return user
}

const getAllUsers = async () => {
  const users = await User.find({})
  const totalUsers = await User.countDocuments()
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  }
}

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload,
) => {
  const ifUserExist = await User.findById(userId)

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
  }

  /**
   * email - can not update
   * name, phone, password address
   * password - re hashing
   *  only admin superadmin - role, isDeleted...
   *
   * promoting to superadmin - superadmin
   */

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND,
    )
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  })

  return newUpdatedUser
}

export const UserService = {
  createUser,
  getAllUsers,
  updateUser,
}
