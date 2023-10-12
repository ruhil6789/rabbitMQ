// import morgan from "morgan"
import bodyParser from "body-parser"
import express, { Response, Request } from "express"


import configs from "./src/configs"
import createUserService from "./src/services"
import createMQConsumer from "./src/consumer"
import createUserRepository from "./src/schema"
import createMQProducer from "./src/publisher/publisher"
import createAuthRouter from "./src/routes"


const app = express()

const conf = configs.createConfigs()
const conn:any = configs.createMongoDB(conf)

const logger = configs.createLogger(__dirname)
const userRepo = createUserRepository(conn)
const producer:any = createMQProducer(conf)
const userService = createUserService(userRepo, producer)

const consumer = createMQConsumer(conf, userService)
const authRouter = createAuthRouter(userService)

app.use(bodyParser.json())
// app.use(morgan('combined', { stream: logger }))
app.use('/auth', authRouter)

app.get('/', (request, response) => {
    response.send("Hello world")
})
consumer()
app.listen(conf.PORT, () => {
    console.log(`Server is running on ${conf.PORT}`);

})