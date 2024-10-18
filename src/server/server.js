import express from "express"
import db from "./db.js"

const PORT = process.env.PORT ?? 8000
const app = express()


app.get('/', (req,res) => {
  res.send('testing')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


