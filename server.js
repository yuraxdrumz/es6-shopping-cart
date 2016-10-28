const express              = require('express')
const app                  = express()
const config               = require('./server/config/config')
const http                 = require('http').Server(app)
const io                   = require('socket.io')(http)
const port                 = process.env.PORT || config.server.port
const morgan               = require('morgan')
const mongoose             = require('mongoose')
const bodyParser           = require('body-parser')
const passport             = require('passport')
const apiRouter            = require('./server/routes/apiRouter')(passport)
                             require('./server/config/passport')(passport)
                             require('./server/routes/socketsRouter')(io)
mongoose.Promise           = require('bluebird')

mongoose.connect(config.server.db)

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

http.listen(port,()=>console.log(`server is running on port ${port}`))
