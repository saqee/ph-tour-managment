import dotenv from "dotenv"
dotenv.config()

interface EnvConfig {
  PORT: number
  DB_URL: string
  NODE_ENV: string
  SECRET: string
  SUPER_ADMIN_PASSWORD: string
  SUPER_ADMIN_EMAIL: string
}

const loadVariables = (): EnvConfig => {
  const item: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "SECRET",
    "SUPER_ADMIN_PASSWORD",
    "SUPER_ADMIN_EMAIL",
  ]
  item.forEach((key) => {
    if (!process.env[key]) {
      throw new Error("item missing" + " " + key)
    }
  })
  return {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    SECRET: process.env.SECRET,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
  }
}

export const envVars = loadVariables()
