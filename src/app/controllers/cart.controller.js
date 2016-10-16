export class cartController{
  constructor($mdDialog,cartService){
    'ngInject'
    this.cancel = function() {
      return $mdDialog.cancel()
    }
    this.items = cartService.getAll()
  }
}
