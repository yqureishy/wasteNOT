const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const router=express.Router()
const bcrypt=require('bcryptjs')

app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.use(express.json())
app.use(express.urlencoded())
app.use(session({
    secret: "keyboard-cat",
    resave: false,
    saveUnitialized: true,
}))








app.listen(3000,()=>{
    console.log("Server is running...")
})