import express from 'express'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
//app.use(logger)

/*app.use('/questions',questionsRouter)
app.use('/users',usersRouter)
app.use('/auth',authRouter)*/


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
