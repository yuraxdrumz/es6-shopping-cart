const express              = require('express')
const app                  = express()
const port                 = process.env.PORT || 5000
const morgan               = require('morgan')
const mongoose             = require('mongoose')
const bodyParser           = require('body-parser')
const passport             = require('passport')
const apiRouter            = require('./server/routes/apiRouter')(passport)
mongoose.Promise           = require('bluebird')
                             require('./server/config/passport')(passport);
mongoose.connect('mongodb://localhost/cart')

let con = mongoose.connection
con.on('open',()=>{
    app.use(morgan('dev'))
    app.use(passport.initialize())
    app.use(bodyParser.json())
    app.use('/api',apiRouter)
    //used for dev
    app.use(express.static(`${__dirname}/.tmp`))
    app.get('/*',(req,res,next)=> {
      res.sendFile(`${__dirname}/.tmp/serve/index.html`)
    })
    //used for dist
    //app.use(express.static(`${__dirname}/dist`))
    //app.get('/*',(req,res,next)=> {
    //  res.sendFile(`${__dirname}/dist/index.html`)
    //})
})

app.listen(port,()=>console.log(`server is running on port ${port}`))
