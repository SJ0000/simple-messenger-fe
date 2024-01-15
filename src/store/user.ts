import {defineStore} from 'pinia'
import {UserDto} from "@/modules/user/dto";

export const userStore = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: false,
      data: {}
    }
  },
  actions:{
    login(userDto : UserDto){
      this.isLoggedIn = true
      this.data = {
        id: userDto.id,
        name: userDto.name,
      }
    },
    logout(){
      this.isLoggedIn = false
      this.data = {}
    }
  },
  persist: true
})
