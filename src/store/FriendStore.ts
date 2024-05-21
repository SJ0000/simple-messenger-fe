import {defineStore} from "pinia";
import {IUser} from "@/modules/user/User";

export const useFriendStore = defineStore(
  "friend",
  () => {
    const friends: Map<number, IUser> = new Map<number, IUser>();

    function initialize(users: Array<IUser>) {
      users.forEach((user) => {
        friends.set(user.id, user);
      });
    }

    function find(userId: number): IUser {
      const friend = friends.get(userId);
      if (friend === undefined)
        throw Error(`Friend(userId = ${userId}) not found`);

      return friend;
    }

    function getFriends(): Array<IUser> {
      return Array.from(friends.values());
    }
    return { friends, initialize, find, getFriends };
  },
  { persist: false }
);
