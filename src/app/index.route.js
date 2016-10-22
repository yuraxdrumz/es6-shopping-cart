export function routerConfig($stateProvider, $urlRouterProvider,$locationProvider) {
  'ngInject';
  $stateProvider.state('home', {
    url: '',
    templateUrl: 'app/components/main/main.html',
    controller:'MainController',
    controllerAs:'main'
  }).state('home.login', {
    url: '/'
    , templateUrl: 'app/components/login/login.html'
    , controller: 'loginController'
    , controllerAs: 'login'
    , parent: 'home'
  }).state('home.register', {
    url: '/register'
    , templateUrl: 'app/components/register/register.html'
    , controller: 'registerController'
    , controllerAs: 'reg'
    , parent: 'home'
  }).state('home.logged',{
    url:'/main',
    templateUrl:'app/components/logged_home/home.html',
    controller:'homeController',
    controllerAs:'logged',
    parent:'home',
    resolve:{
      items:(cartService)=>{
        'ngInject'
        return cartService.showItems()
      }
    }
  }).state('home.purchases',{
    url:'/purchases',
    templateUrl:'app/components/purchases/purchases.html',
    controller:'purchaseController',
    controllerAs:'pur',
    parent:'home',
    resolve:{
      my_purchases:(userService)=>{
        'ngInject'
        return userService.getPurchases()
      }
    }
  })
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
}
