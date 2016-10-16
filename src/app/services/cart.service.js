export class cartService{
    constructor($http,$localStorage){
        'ngInject';
        this.$http = $http
        this.$localStorage  = $localStorage
        if(!this.$localStorage.items){
            this.$localStorage.items = []
        }
        if(!this.$localStorage.checked){
          this.$localStorage.checked = []
        }
    }
    //add
    add(item){
      this.$localStorage.items.push(item)
      this.$localStorage.checked.push(item.id)
    }
    getAll(){
        return this.$localStorage.items
    }
    showItems(){
        return this.$http.get(`/api/items`).then((res)=>res.data.items).catch((err)=>err)
    }
    //delete
    deleteItem(item){
      this.$localStorage.items.splice(item,1)
      let index = this.$localStorage.checked.indexOf(item.id)
      this.$localStorage.checked.splice(index,1)
    }
    delete() {
      this.$localStorage.items = []
      this.$localStorage.checked = []
    }
    //checkout
    buyItems(items){
      let obj = {}
      obj.items = items
      return this.$http.post(`/api/bought`,obj).then((res)=>res.data).catch((err)=>err)
    }
}
