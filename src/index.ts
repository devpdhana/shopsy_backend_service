import express from 'express'
import dotenv from 'dotenv'
import authentication_router from './controllers/authentication_controller';
import store_router from './controllers/store_controller';
import cookie_parse from 'cookie-parser'
import authenticate from './helpers/middlewares/auth.middleware';
dotenv.config();


const app = express()
app.use(express.json())
app.use(cookie_parse())
app.use("/auth", authentication_router)
app.use("/store",authenticate, store_router)

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`)
})