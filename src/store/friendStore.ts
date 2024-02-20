import { defineStore } from "pinia";
import { User } from "@/modules/user/interface";

interface friendState {
  friends: Map<number, User>;
}

export const friendStore = defineStore("friend", {
  state: (): friendState => {
    return {
      friends: new Map<number, User>(),
    };
  },

  actions: {
    initialize(users: Array<User>) {
      users.forEach((user) => {
        this.friends.set(user.id, user);
      });
    },

    find(userId: number): User {
      const friend = this.friends.get(userId);
      if (friend === undefined)
        throw Error(`Friend(userId = ${userId}) not found`);

      return friend;
    },

    getFriends(): Array<User> {
      return Array.from(this.friends.values());
    },
  },
  persist: false,
});
