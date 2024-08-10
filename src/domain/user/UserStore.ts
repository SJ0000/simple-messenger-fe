import {defineStore} from "pinia";
import User from "@/domain/user/User";
import {ref} from "vue";
import {ApiClient} from "@/common/api/ApiClient";
import {SignUpDto} from "@/domain/auth/dto";

export const useUserStore = defineStore(
  "user",
  () => {
    const apiClient = ApiClient.getInstance()
    const userMap = ref(new Map<number, User>());

    async function signUpUser(dto : SignUpDto){
      await apiClient.signUp(dto)
    }

    function find(userId: number) {
      const result = userMap.value.get(userId)
      if (result === undefined)
        throw Error(`User id ${userId} not exists.`)
      return result
    }

    function addIfAbsent(...users: User[]): void {
      users.forEach(user => {
        if (!userMap.value.has(user.id))
          userMap.value.set(user.id, user)
      })
    }

    function exists(userId: number): boolean{
      return userMap.value.has(userId)
    }

    return {
      userMap,
      signUpUser,
      find,
      addIfAbsent,
      exists
    }
  },
  {persist: false}
)
