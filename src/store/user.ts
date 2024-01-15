import {defineStore} from 'pinia'
import {User} from "@/modules/user/interface";

export const userStore = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: false,
      data: {
        id: 0,
        name: ""
      }
    }
  },
  actions:{
    login(user : User){
      this.isLoggedIn = true
      this.data = {
        id: user.id,
        name: user.name,
      }
    },
    logout(){
      this.isLoggedIn = false
      this.data = {
        id: 0,
        name: ""
      }
    }
  },
  persist: true
})
