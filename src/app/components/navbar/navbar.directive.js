export function NavbarDirective() {
  'ngInject';
  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    controller: NavbarController,
    scope:{
      currencies:'='
    },
    controllerAs: 'vm',
    bindToController: true
  }
  return directive
}

class NavbarController {
  constructor($location,$log,$scope,userService,$state,toastr,cartService,$mdDialog,currencyService,$localStorage,$timeout,socketService) {
    'ngInject';
    this.$timeout = $timeout
    this.cartService = cartService
    this.currencyService = currencyService
    this.$localStorage = $localStorage
    this.socketService = socketService
    this.$userService = userService
    this.$location = $location
    this.$scope = $scope
    this.$log = $log
    this.logged = false
    this.$state = $state
    this.$mdDialog = $mdDialog
    this.isCollapsed = false
    this.$scope.$watch(()=>this.$userService.isLoggedIn(),this.checkLogged())
  }
  checkRoute(loc){
    return loc===this.$location.path()
  }
  changeBase(event,key,val){
    event.preventDefault()
    this.currencyService.changeBase(key,val)
  }
  logout(){
    let data = {}
    let {base} = this.$localStorage.cur
    data.items = this.$localStorage.items
    data.base = base
    data.user_id = this.$userService.currentUser()._id
    this.socketService.emit('collectData',data)
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
  checkLogged(){
    return (newVal,oldVal)=>{
      if(newVal) this.logged = true
      else{
        this.logged = false
        this.$state.go('home.login')
      }
    }
  }
}
