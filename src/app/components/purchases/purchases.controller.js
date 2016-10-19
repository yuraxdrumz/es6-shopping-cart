export class purchaseController {
  constructor(my_purchases,moment,orderByFilter) {
    'ngInject'

    this.my_purchases = my_purchases
    this.limit = 5
    this.moment = moment
    this.orderByFilter = orderByFilter
    this.parseDates()
    this.reverse = false
    this.totalPaidAndTotalItems()
    this.sortBy()
    this.sortWith = 'date'
  }
  loadMore(){
    this.limit += 5
  }
  parseDates(){
    for(let pur of this.my_purchases){
      pur.date = (this.moment(pur.date).format('DD/MM/YYYY - hh:mm:ss'))
    }
  }
  totalPaidAndTotalItems(){
    let sum = 0
    let items_sum = 0
    let obj = {}

    for(let purchase of this.my_purchases){
      for(let item of purchase.items){
        sum+=(item.price*item.getValue)
        items_sum++
      }
    }
    this.sum = sum
    this.items_sum = items_sum

  }
  sortBy(){
    this.reverse = !this.reverse
    this.my_purchases = this.orderByFilter(this.my_purchases,this.sortWith,this.reverse)
  }

}
