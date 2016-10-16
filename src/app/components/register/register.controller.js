export class registerController {
    constructor($timeout, toastr,$log,userService,$state) {
        'ngInject'
//        userService.logout()
        this.toastr = toastr
        this.register = (user)=>{
            userService.register(user).then((res)=>{
                $state.go('home.logged')
            }).catch((err)=>toastr.error(err.data.message))
        }
    }
}
