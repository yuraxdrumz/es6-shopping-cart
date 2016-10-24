export function itemDirective() {
  'ngInject';
  let directive = {
      restrict: 'E',
      templateUrl: 'app/components/item/item.html',
      controller: itemController,
      controllerAs: 'itemCtrl',
      bindToController: true,
      scope:{
          items:'='
      }
  }
  return directive;
}
class itemController {
  constructor($log,cartService,$localStorage,toastr,$timeout) {
    'ngInject';
    this.cartService = cartService
    this.limit = 5
    this.$log = $log
    this.$localStorage = $localStorage
    this.toastr = toastr
    this.$timeout = $timeout
    this.$timeout(()=>{
      this.checkAfterRefresh = this.cartService.getAll()
      this.getQuantityAfterRefresh()
    },100)
  }
  getQuantityAfterRefresh(){
    for(let item of this.checkAfterRefresh){
      for(let itemInCart of this.items){
        if(item.id === itemInCart.id){
          itemInCart.getValue = item.getValue
        }
      }
    }
  }
  add(item){
    this.cartService.add(item)
    this.toastr.success('Item was successfully added','item added')
  }
  isChecked(item){
    return this.$localStorage.checked.includes(item.id)
  }
  loadMore(){
    return this.limit+=5
  }
  remove(item){
    this.cartService.deleteItem(item)
    this.toastr.warning('Item was successfully removed','item removed')
  }
}
