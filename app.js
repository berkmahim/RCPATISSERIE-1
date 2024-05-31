import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import pageRoute from "./routes/pageRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import adminRoute from "./routes/adminRoute.js";

import {checkUser} from "./middlewares/authMiddleware.js";
import conn from './db.js'




dotenv.config()
conn()
const port = 3000
const app = express()


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('*', checkUser)
app.use('/',pageRoute)
app.use('/users',userRoute)
app.use('/products',productRoute)
app.use('/cart',cartRoute)
app.use('/admin',adminRoute)




app.listen(port, ()=> {
    console.log(`uygulama ${port} portunda basladi`)
})