/**
 * Created by Yurasya on 10/29/2016.
 */
const fs                        = require('fs')
const request                   = require('request')
const cheerio                   = require('cheerio')
const log                       = require('./logUtil')
const charset                   = require('charset')
const jschardet                 = require('jschardet')
const Iconv                     = require('iconv').Iconv


url = 'http://kinozal.tv/top.php'

let scrapeToDownload = (url)=>{
  let cookie = '__cfduid=d858469c75343dfa4f8b216ca69f21f451477780910; _692293176245=1; _692293176246=1477863610325; uid=2606132; pass=63bd88ed34ee4fbda4fed6f8a5cfb581; MarketGidStorage=%7B%220%22%3A%7B%22svspr%22%3A%22%22%2C%22svsds%22%3A2%2C%22TejndEEDj%22%3A%22MTQ3Nzg1MjkzMDYzNjU5OTA1MTUyMDE%3D%22%7D%2C%22C599051%22%3A%7B%22page%22%3A2%2C%22time%22%3A1477852940590%7D%7D'
  request({url: url, encoding: 'binary',method:'GET',headers: {'Cookie': cookie}}, (err, res, body)=> {
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
        request.get({url:`http://kinozal.tv${href}`,encoding:'binary',headers: {'Cookie': cookie}},(err,res,body)=>{
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
