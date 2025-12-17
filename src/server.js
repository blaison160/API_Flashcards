import express from 'express'
import collectionsRouter from './routers/collectionsRouter.js'
import logger from './middleware/logger.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(logger)

app.use('/collections',collectionsRouter)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
