export function runBlock ($log,userService,$localStorage,$http,$rootScope,$location) {
  'ngInject';

  // this is used to connect object methods to use inside templates in angular, in order to call these methods in isolated scope
  // you must pass it to the constructor.prototype!
  $rootScope.constructor.prototype.keys = Object.keys

  if(userService.isLoggedIn()){
    $http.defaults.headers.common.Authorization = 'Bearer ' + userService.getToken()
  }
  $rootScope.$on('$locationChangeStart',(event,next,current)=>{
    if(userService.isLoggedIn()){
      switch($location.path()){
        case '/':
        case '/register':
          $location.path('/main');
          break;
      }
    }
    let publicPages = ['/','/register']
    let restrictedPage = !publicPages.includes($location.path())
    if(restrictedPage && !userService.isLoggedIn()){
      $location.path('/')
    }
  })
}
