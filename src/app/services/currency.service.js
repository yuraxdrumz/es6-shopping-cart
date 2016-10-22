export class currencyService {
  constructor($http,$localStorage) {
    'ngInject'
    this.$http = $http
    this.$localStorage = $localStorage
  }
  get(){
    return this.$http.get(`http://api.fixer.io/latest?base=USD`,{cache:true}).then((res)=>res.data).catch((err)=>err)
  }
  changeBase(key,val){
    this.$localStorage.cur.base = {}
    this.$localStorage.cur.base[key] = val
  }
}

