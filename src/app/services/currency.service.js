export class currencyService {
  constructor($http,$localStorage) {
    'ngInject'
    this.$http = $http
    this.$localStorage = $localStorage
    this.get()

  }
  get(){
    return this.$http.get(`http://api.fixer.io/latest?base=USD`,{cache:true}).then((res)=>{
      if(this.$localStorage.cur){
        res.data.base = this.$localStorage.cur.base
        res.data.rates['USD'] = 1
        this.$localStorage.cur = res.data
      }
      else{
        res.data.base = {}
        res.data.base['USD'] = 1
        this.$localStorage.cur = res.data
      }
    }).catch((err)=>err)
  }
  changeBase(key,val){
    this.$localStorage.cur.base = {}
    this.$localStorage.cur.base[key] = val
  }

}

