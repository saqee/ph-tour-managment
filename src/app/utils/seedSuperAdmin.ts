import bcrypt from "bcryptjs"
import type { IAuthProvider, IUser } from "../modules/user/user.interface.js"
import { User } from "../modules/user/user.model.js"
import { envVars } from "./../config/env"

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    })
    if (isSuperAdminExist) {
      console.log("super admin already exists")
      return
    }
    const hashPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, 10)
    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    }
    const superAdmin: IUser = await User.create({
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashPassword,
      name: "SUper Admin",
      role: "SUPER_ADMIN",
      auths: [authProvider],
      isVerified: true,
    })
    console.log(superAdmin, "created successfully")
  } catch (error) {}
}
