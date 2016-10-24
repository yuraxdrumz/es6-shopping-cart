export class homeController{
  constructor($timeout,toastr,$log,$state,items,socketService,userService,$localStorage,$rootScope) {
    'ngInject'
    this.items = items
    this.userService = userService
    this.socketService = socketService
    this.toastr = toastr
    this.$localStorage = $localStorage
    this.user = this.userService.currentUser()
    this.checkCountForSockets()
  }
  sendInit(){
    this.socketService.emit('init',this.user._id)
    this.socketService.once('timesLogged',(data)=>{
      if(data == 1) {
        this.$localStorage.items = []
        this.$localStorage.checked = []
        this.$localStorage.cur.base = {}
        this.$localStorage.cur.base['USD'] = 1
        this.toastr.info(`Welcome ${this.user.name || this.user.email},this is your first time logging in!`)
      }else{
        this.getCartFavourites()
        this.toastr.info(`Welcome back ${this.user.name||this.user.email}, this is your login number ${data}, enjoy!`)
      }
    })
  }
  getCartFavourites(){
    this.socketService.emit('getCartFavourites',this.user._id)
    this.socketService.once('gotCart',(data)=>{
      this.$localStorage.checked = []
      this.$localStorage.cur.base = data.base
      for(let item of data.items){
        let {id} = item
        this.$localStorage.checked.push(id)
      }
      this.$localStorage.items = data.items
    })
  }
  checkCountForSockets(){
    if (this.socketService.count == 0){
      this.sendInit()
      this.socketService.count+=1
    }
    else void(0)
  }
}
