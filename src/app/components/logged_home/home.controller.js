export class homeController{
  constructor($timeout,toastr,$log,$state,items,socketService,userService) {
    'ngInject'
    this.items = items
    this.userService = userService
    this.socketService = socketService
    this.toastr = toastr

    if(this.socketService.count > 0){
      void(0)
    }else {
      this.sendInit()
      this.socketService.count+=1
    }
  }
  sendInit(){
    let user = this.userService.currentUser()
    this.socketService.emit('init',user._id)
    this.socketService.on('init',(data)=>{
      if(data == 1) {
        this.toastr.info(`Welcome ${user.name || user.email},this is your first time logging in!`)
      }else{
        this.toastr.info(`Welcome back ${user.name||user.email}, this is your login number ${data}, enjoy!`)
      }
    })
  }

}
