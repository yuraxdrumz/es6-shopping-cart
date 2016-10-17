
import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './components/main/main.controller';
import { loginController } from './components/login/login.controller';
import { homeController } from './components/logged_home/home.controller';
import { registerController } from './components/register/register.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { userService } from '../app/services/user.service';
import { cartService } from '../app/services/cart.service';
import { itemDirective } from '../app/components/item/item.directive.js';
import { cartController } from './components/cart/cart.controller.js';
  angular.module('newProject', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr','ngMaterial','ngStorage'])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('userService',userService)
    .service('cartService',cartService)
    .controller('MainController', MainController)
    .controller('loginController',loginController)
    .controller('homeController',homeController)
    .controller('registerController',registerController)
    .controller('cartController',cartController)
    .directive('acmeNavbar', NavbarDirective)
    .directive('itemDir', itemDirective)
