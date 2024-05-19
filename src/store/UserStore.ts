import {defineStore} from "pinia";
import User from "@/modules/user/User";

export const useUserStore = defineStore(
  "user",
  () => {
    const users = new Map<number, User>();

    function find(userId: number): User {
      const result = users.get(userId)
      if(result === undefined)
        throw Error(`User id ${userId} not exists.`)
      return result
    }

    function addIfAbsent(user: User): void {
      if (users.has(user.id))
        return;
      users.set(user.id, user)
    }

    return {
      find,
      addIfAbsent
    }
  },
  {persist: false}
)
