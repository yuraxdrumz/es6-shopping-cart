export function NavbarDirective() {
    'ngInject';
    let directive = {
        restrict: 'E'
        , templateUrl: 'app/components/navbar/navbar.html'
        , controller: NavbarController
        , controllerAs: 'vm'
        , bindToController: true
    };
    return directive;
}
class NavbarController {
    constructor($log, $location,$scope,userService,$state,toastr,cartService,$mdDialog) {
        'ngInject';
        this.$userService = userService
        this.$location = $location
        this.$scope = $scope
        this.logged = false
        this.$state = $state
        this.$mdDialog = $mdDialog
        this.$scope.$watch(()=>this.$userService.isLoggedIn(),this.checkLogged())
    }
    checkRoute(loc){
      return loc===this.$location.path()
    }
    logout(){
      this.$userService.logout()
      this.$state.go('home.login')
    }
    showCart(event){
      this.$mdDialog.show({
        controller:'cartController',
        controllerAs:'dg',
        templateUrl: 'app/templates/cartTemplate.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose:true
      })
    }
    checkLogged(newVal,oldVal){
      return (newVal,oldVal)=>{
        console.log(newVal,oldVal)
        if(newVal) this.logged = true
        else{
          this.logged = false
        }
      }
    }
}
//
// $scope.$watch(function(){
//     return userService.isLoggedIn()
// },function(newVal,oldVal){
//     if(newVal){
//         self.logged = true
//     }else{
//         self.logged = false
//     }
// })
