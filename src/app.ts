import cors from "cors"
import express from "express"

import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.ts"
import { notFound } from "./app/middlewares/not-found.ts"
import { router } from "./app/routes/index.ts"

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1", router)

app.use(globalErrorHandler)
app.use(notFound)
export default app
