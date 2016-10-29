/**
 * Created by Yurasya on 10/29/2016.
 */
let fs                        = require('fs')
let request                   = require('request')
let cheerio                   = require('cheerio')
let log                       = require('./logUtil')
let charset                   = require('charset')
let jschardet                 = require('jschardet')
let Iconv                     = require('iconv').Iconv

url = 'http://kinozal.tv/top.php'

let scrapeToDownload = (url)=>{
  request.get({url: url, encoding: 'binary'}, (err, res, body)=> {
    if(!err){
      body = new Buffer(body, 'binary')
      conv = new Iconv('windows-1251', 'utf8')
      body = conv.convert(body).toString()
      let $ = cheerio.load(body)
      let legitHrefs = []
      $('a').filter(function(){
        let data = $(this)
        let title = data.attr('title')
        let href = data.attr('href')
        if(title && (title.indexOf('2016') > 0) && (title.indexOf('HDRip')> 0)) legitHrefs.push(href)
      })
      legitHrefs.forEach((href)=>{
        request.get({url:`http://kinozal.tv${href}`,encoding:'binary'},(err,res,body)=>{
          if(!err){
            body = new Buffer(body, 'binary')
            conv = new Iconv('windows-1251', 'utf8')
            body = conv.convert(body).toString()
            let $ = cheerio.load(body)
            let widthOfStars = (($('#starbar').attr('style')).split(':')[1])
            let isGoodRating = parseInt(widthOfStars.split('.')[0])>120
            if(isGoodRating) log.black($('.nw').find('a').attr('href'))
          }
        })
      })

    }
  })
}
scrapeToDownload(url)

// a scraper for kinozal to find all the moves from 2016 in top which have a rating of 6/10 stars and more
