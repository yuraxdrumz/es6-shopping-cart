const httpProxy = require('http-proxy')

let target = 'http://localhost:5000'
let proxy = httpProxy.createProxyServer({
  target
})
let proxyMiddleware = (req,res,next)=>{
  if(/\.(html|css|js|png|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|woff2|cur|json)(\?((r|v|rel|rev)=[\-\.\w]*)?)?$/.test(req.url)){
    next()
  }else{
    proxy.web(req,res)
  }

}
module.exports = [proxyMiddleware]
