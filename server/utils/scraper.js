/**
 * Created by Yurasya on 10/29/2016.
 */
// a scraper for kinozal to find all the moves from 2016 in top which have a rating of 6/10 stars and more
const fs                        = require('fs')
const rp                         = require('request-promise')
const cheerio                   = require('cheerio')
const log                       = require('./logUtil')
const charset                   = require('charset')
const jschardet                 = require('jschardet')
const Iconv                     = require('iconv').Iconv
const Promise                   = require('bluebird')
const config                    = require('../config/config')

url = 'http://kinozal.tv/top.php'
let cookie = config.cookie

let scrapeToDownload = (url,cookie,fromEncoding,toEncoding,yearOfMovie)=>{
  rp({url: url, encoding: 'binary',method:'GET',headers: {'Cookie': cookie}})
  .then(body=>{
    body = new Buffer(body, 'binary')
    conv = new Iconv(fromEncoding, toEncoding)
    body = conv.convert(body).toString()
    let $ = cheerio.load(body)
    let legitHrefs = []
    let promisesToResolve = []
    $('a').filter(function(){
      let data = $(this)
      let title = data.attr('title')
      let href = data.attr('href')
      if(title && (title.indexOf(yearOfMovie) > 0) && (title.indexOf('HDRip')> 0))legitHrefs.push(href)
    })
    let toDownload = []
    Promise.map(legitHrefs,(each_href)=>{
      return rp({url:`http://kinozal.tv${each_href}`,encoding:'binary',headers: {'Cookie': cookie}})
      .then(body=>{
        body = new Buffer(body, 'binary')
        conv = new Iconv('windows-1251', 'utf8')
        body = conv.convert(body).toString()
        let $ = cheerio.load(body)
        let widthOfStars = (($('#starbar').attr('style')).split(':')[1])
        let isGoodRating = parseInt(widthOfStars.split('.')[0])>120
        if(isGoodRating)return toDownload.push($('.nw').find('a').attr('href'))
      }).catch(err=>err)
    }).then(values=>{
      log.cyan(toDownload)
    }).catch(err=>err)
  }).catch((err)=>err)
}
setInterval(()=>scrapeToDownload(url,cookie,'windows-1252','utf-8','2016'),100)



