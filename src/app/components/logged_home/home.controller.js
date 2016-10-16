export class homeController{
    constructor($timeout,toastr,$log,userService,$state,items) {
        'ngInject'
        this.userService = userService
        this.items = items
    }
}
