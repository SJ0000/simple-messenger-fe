import {defineStore} from "pinia";
import User from "@/modules/user/User";

export const useFriendStore = defineStore(
  "friend",
  () => {
    const friends: Map<number, User> = new Map<number, User>();

    function initialize(users: Array<User>) {
      users.forEach((user) => {
        friends.set(user.id, user);
      });
    }

    function find(userId: number): User {
      const friend = friends.get(userId);
      if (friend === undefined)
        throw Error(`Friend(userId = ${userId}) not found`);

      return friend;
    }

    function getFriends(): Array<User> {
      return Array.from(friends.values());
    }
    return { friends, initialize, find, getFriends };
  },
  { persist: false }
);
