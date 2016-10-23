export class socketService {
  constructor($rootScope) {
    'ngInject'
    this.socket = io('http://localhost:5000')
    this.$rootScope = $rootScope
    this.count = 0

  }
  on(eventName,callback){
    if(this.count > 0){
      console.log('already started')
    }else{
      this.socket.on(eventName,(data)=>{
        this.$rootScope.$apply(()=>{
          callback(data)
        })
      })
    }
  }
  emit(eventName,data,callback) {
    this.socket.emit(eventName,data,()=>{
      this.$rootScope.$apply(()=>{
        if(callback) callback(...arguments)
      })
    })
  }
  remove(){
    this.socket.removeListener()
  }
}

