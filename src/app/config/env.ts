import dotenv from "dotenv"
dotenv.config()

interface EnvConfig {
  PORT: number
  DB_URL: string
  NODE_ENV: string
}

const loadVariables = (): EnvConfig => {
  const item: string[] = ["PORT", "DB_URL", "NODE_ENV"]
  item.forEach((key) => {
    if (!process.env[key]) {
      throw new Error("item missing" + " " + key)
    }
  })
  return {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
  }
}

export const envVars = loadVariables()
