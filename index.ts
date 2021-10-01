import { PrismaClient } from '@prisma/client'
import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import { User} from './models/user/index'

//Routes import
import  router  from './routes'

const prisma = new PrismaClient()

async function main() {
  // Connect the client
	await prisma.$connect()
	console.log("Database connected!!")
  // ... you will write your Prisma Client queries here
}

const app = express();
app.use(cors())
app.use(json())
app.use(urlencoded({
    extended: true
}))

//Route Middleware
app.use(router)

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

//Creating Server on the following port
app.listen(() => {
	console.log("Port running",process.env.PORT || 5000)
})