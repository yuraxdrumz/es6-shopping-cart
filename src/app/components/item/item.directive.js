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
    constructor($log,cartService,$localStorage,$mdDialog) {
        'ngInject';
        this.cartService = cartService
        this.limit = 5
        this.$log = $log
        this.$localStorage = $localStorage
        this.$mdDialog = $mdDialog
    }
    dialog(title,desc){
      return this.$mdDialog.show(
         this.$mdDialog.alert()
           .clickOutsideToClose(true)
           .title(title)
           .textContent(desc)
           .ariaLabel('Alert Dialog Demo')
           .ok('Got it!')
       )
    }
    add(item){
      this.cartService.add(item)
      this.dialog('item added','youre item was successfully added to the shopping cart, click the white bag on the top navbar to check your cart')
    }
    isChecked(item){
      return this.$localStorage.checked.includes(item.id)
    }
    loadMore(){
      return this.limit+=5
    }
    remove(item){
      this.cartService.deleteItem(item)
      this.dialog('item removed','your item was successfully removed from the shopping cart')

    }
}
