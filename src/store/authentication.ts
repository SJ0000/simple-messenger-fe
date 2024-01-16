import {defineStore} from 'pinia'
import {Authentication} from "@/modules/auth/interface";
import {User} from "@/modules/user/interface";


export const authenticationStore = defineStore('authentication', {
  state: () : Authentication => {
    return {
      isLoggedIn: false,
      user: null,
      accessToken :null
    }
  },
  actions:{
    login(accessToken : string, user : User){
      this.isLoggedIn = true
      this.user = {
        id: user.id,
        name: user.name,
      }
      this.accessToken = accessToken
    },
    logout(){
      this.isLoggedIn = false
      this.user = null
      this.accessToken = null
    }
  },
  persist: true
})
