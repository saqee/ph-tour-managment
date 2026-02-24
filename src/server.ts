import { Server } from "http"
import mongoose from "mongoose"
import app from "./app"
import { envVars } from "./app/config/env.ts"
let server: Server

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL as string)
    console.log("connect to db")
    server = app.listen(envVars.PORT, () => {
      console.log("server is running")
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION! 💥")
  console.error(reason)

  server.close(() => {
    process.exit(1)
  })
})

process.on("uncaughtException", (reason) => {
  console.log("uncaughtException REJECTION! 💥")
  console.log(reason)

  server.close(() => {
    process.exit(1)
  })
})

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server")
  server.close(() => {
    debug("HTTP server closed")
  })
})
