import {defineStore} from "pinia";
import User from "@/modules/user/User";

export const useUserStore = defineStore(
  "user",
  () => {
    const userMap = new Map<number, User>();

    function find(userId: number): User {
      const result = userMap.get(userId)
      if (result === undefined)
        throw Error(`User id ${userId} not exists.`)
      return result
    }

    function addIfAbsent(...users: User[]): void {
      users.forEach(user => {
        if (!userMap.has(user.id))
          userMap.set(user.id, user)
      })
    }

    function exists(userId: number): boolean{
      return userMap.has(userId)
    }

    return {
      find,
      addIfAbsent,
      exists
    }
  },
  {persist: false}
)
