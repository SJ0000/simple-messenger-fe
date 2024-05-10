import {defineStore} from "pinia";
import {User} from "@/modules/user/interface";
import {Ref, ref} from "vue";

export const friendStore = defineStore(
  "friend",
  () => {
    const friends: Ref<Map<number, User>> = ref(new Map<number, User>());

    function initialize(users: Array<User>) {
      users.forEach((user) => {
        friends.value.set(user.id, user);
      });
    }

    function find(userId: number): User {
      const friend = friends.value.get(userId);
      if (friend === undefined)
        throw Error(`Friend(userId = ${userId}) not found`);

      return friend;
    }

    function getFriends(): Array<User> {
      return Array.from(friends.value.values());
    }
    return { friends, initialize, find, getFriends };
  },
  { persist: false }
);
