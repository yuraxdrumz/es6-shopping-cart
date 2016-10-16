export class userService{

    constructor($http,$localStorage,$window){
        'ngInject'
        this.$http = $http
        this.$localStorage = $localStorage
        this.$window = $window

    }
    saveToken(token){
        return this.$localStorage['mean-token'] = token
    }
    getToken(){
        return this.$localStorage['mean-token']
    }

    currentUser(){
        if(this.isLoggedIn()){
            let token = this.getToken();
            let payload = token.split('.')[1];
            payload = this.$window.atob(payload);
            payload = angular.fromJson(payload);
            return{
                email:payload.email,
                name:payload.name,
                _id:payload._id
            }
        }
        return false
    };
    isLoggedIn(){
        let token = this.getToken()
        let payload
        if(token){
            payload = token.split('.')[1]
            payload = this.$window.atob(payload)
            payload = angular.fromJson(payload)
            return payload.exp > Date.now()/1000
        }else{
            return false
        }
    }
    register(user){
        return this.$http.post(`/api/register`,user)
         .then((res)=>this.saveToken(res.data.token))
    }
    login(user){
        return this.$http.post(`/api/login`,user)
            .then((res)=>{
            if(res.data.token){
                this.saveToken(res.data.token)
                this.$http.defaults.headers.common.Authorization = 'Bearer ' + res.data.token
            }

        })
    }
    logout(){
        delete this.$localStorage['mean-token']
        this.$http.defaults.headers.common.Authorization = ''
    }
}
