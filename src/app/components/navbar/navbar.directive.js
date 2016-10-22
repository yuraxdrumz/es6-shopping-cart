export function NavbarDirective() {
  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  }
  return directive
}

class NavbarController {
  constructor($location,$log,$scope,userService,$state,toastr,cartService,$mdDialog,currencyService,$localStorage,$timeout) {
    'ngInject';
    this.currencyService = currencyService
    this.$localStorage = $localStorage
    this.$userService = userService
    this.$location = $location
    this.$scope = $scope
    this.$log = $log
    this.logged = false
    this.$state = $state
    this.$mdDialog = $mdDialog
    this.isCollapsed = false
    this.$scope.$watch(()=>this.$userService.isLoggedIn(),this.checkLogged())
    $timeout(()=>this.curs = this.$localStorage.cur.rates,1000)
  }
  checkRoute(loc){
    return loc===this.$location.path()
  }
  changeBase(key,val){
    this.currencyService.changeBase(key,val)
  }
  logout(){
    this.$userService.logout()
    this.$state.go('home.login')
  }
  showCart(event){
    this.$mdDialog.show({
      controller:'cartController',
      controllerAs:'dg',
      templateUrl: 'app/components/cart/cartTemplate.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true
    })
  }
  checkLogged(newVal,oldVal){
    return (newVal,oldVal)=>{
      if(newVal) this.logged = true
      else{
        this.logged = false
        this.$state.go('home.login')
      }
    }
  }
}
