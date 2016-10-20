export class loginController{
    constructor($timeout, toastr,$log,userService,$state) {
      'ngInject'
      this.toastr = toastr;
      this.userService = userService
      this.$state = $state
    }
    login(user){
      this.userService.login(user).then((res)=>{
        this.$state.go('home.logged')
      }).catch((err)=>this.toastr.error(err.data.message))
    }
}
