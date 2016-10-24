export class socketService {
  constructor($rootScope) {
    'ngInject'
    this.socket = io('http://localhost:5000')
    this.$rootScope = $rootScope
    this.count = 0
  }
  once(eventName,callback){
      this.socket.once(eventName,(data)=>{
        this.$rootScope.$apply(()=>{
          callback(data)
        })
      })
  }
  emit(eventName,data,callback) {
    this.socket.emit(eventName,data,()=>{
      this.$rootScope.$apply(()=>{
        if(callback) callback(...arguments)
      })
    })
  }
}

