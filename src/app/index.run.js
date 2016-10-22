export function runBlock ($log,userService,$localStorage,$http,$rootScope,$location) {
  'ngInject';
  $rootScope.Utils = {
    keys : Object.keys
  }
  if(userService.isLoggedIn()){
      $http.defaults.headers.common.Authorization = 'Bearer ' + userService.getToken()
  }
    $rootScope.$on('$locationChangeStart',function(event,next,current){
        if(userService.isLoggedIn()){
            switch($location.path()){
                case '/':
                    $location.path('/main')
                    break;
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
