export function itemDirective() {
    'ngInject';
    let directive = {
        restrict: 'E'
        , templateUrl: 'app/components/item/item.html'
        , controller: itemController
        , controllerAs: 'itemCtrl'
        , bindToController: true,
        scope:{
            items:'='
        }
    };
    return directive;
}
class itemController {
    constructor($log,cartService,$localStorage,toastr) {
        'ngInject';
        this.cartService = cartService
        this.limit = 5
        this.$log = $log
        this.$localStorage = $localStorage
        this.toastr = toastr
    }

    add(item){
      this.cartService.add(item)
      this.toastr.success('youre item was successfully added','item added')
    }
    isChecked(item){
      return this.$localStorage.checked.includes(item.id)
    }
    loadMore(){
      return this.limit+=5
    }
    remove(item){
      this.cartService.deleteItem(item)
      this.toastr.warning('your item was successfully removed','item removed')

    }
}
