import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const corsOptions = {
    origin: (origin, callback) => {
        // Optionally restrict origins here
        origin && console.log('CORS', origin)
        callback(null, true)
    }
}

const { EXPRESS_DEMO_TITLE } = process.env
const randomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1) + from)

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.json({ hello: 'world', randomNumber: randomNumber(1, 100) })
})

export default app
