import {defineStore} from "pinia";
import User from "@/modules/user/User";
import {ref} from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const userMap = ref(new Map<number, User>());

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
      find,
      addIfAbsent,
      exists
    }
  },
  {persist: false}
)
