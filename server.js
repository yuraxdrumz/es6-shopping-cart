const express              = require('express')
const app                  = express()
const config               = require('./server/config/config')
const http                 = require('http').Server(app)
const io                   = require('socket.io')(http)
const morgan               = require('morgan')
const mongoose             = require('mongoose')
const bodyParser           = require('body-parser')
const passport             = require('passport')
const apiRouter            = require('./server/routes/apiRouter')(passport)
                             require('./server/config/passport')(passport)
                             require('./server/routes/socketsRouter')(io)
mongoose.Promise           = require('bluebird')
const port                 = process.env.PORT || config.server.port

mongoose.connect(config.server.db)

let con = mongoose.connection
con.on('open',()=>{
  app.use(morgan('dev'))
  app.use(passport.initialize())
  app.use(bodyParser.json())
  //used for dev
  //app.use(express.static(`${__dirname}/.tmp`))
  //app.use(express.static(`${__dirname}/node_modules/socket.io-client/dist`))
  app.use('/api',apiRouter)
  //app.get('/*',(req,res,next)=> {
  //  res.sendFile(`${__dirname}/.tmp/serve/index.html`)
  //})
  //used for dist
  app.use(express.static(`${__dirname}/dist`))
  app.get('/*',(req,res,next)=> {
    res.sendFile(`${__dirname}/dist/index.html`)
  })
  app.use((err,req,res,next)=>{
    if(err.name === 'UnauthorizedError') {
      res.status(401).json(err.name)
    }else{
      res.status(err.status || 500).json(err.name || {message:'something went wrong'})
    }
  })
})

http.listen(port,()=>console.log(`server is running on port ${port}`))
