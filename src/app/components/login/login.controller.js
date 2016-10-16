export class loginController{
    constructor($timeout, toastr,$log,userService,$state) {
        'ngInject'
//        userService.logout()

        this.toastr = toastr;
        this.login = (user)=>{
            userService.login(user).then((res)=>{
               $state.go('home.logged')
            }).catch((err)=>toastr.error(err.data.message))

        }

    }

}
