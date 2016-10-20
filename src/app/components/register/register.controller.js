export class registerController {
    constructor($timeout, toastr,$log,userService,$state) {
      'ngInject'
      this.toastr = toastr
      this.userService = userService
      this.$state = $state
    }
    register(user){
      this.userService.register(user).then((res)=>{
        this.toastr.success('Account was successfully created')
        this.userService.logout()
        this.$state.go('home.login')
      }).catch((err)=>toastr.error(err.data.message))
    }
}
