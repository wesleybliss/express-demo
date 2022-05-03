import express from 'express'
import bodyParser from 'body-parser'
import * as middleware from './middleware'
import * as routes from './routes'

const randomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1) + from)

const app = express()

app.use(middleware.cors)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', routes.root)

export default app
