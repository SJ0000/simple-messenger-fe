import {defineStore} from "pinia";
import User, {IUser} from "@/domain/user/User";
import {ApiClient} from "@/common/api/ApiClient";
import {useUserStore} from "@/domain/user/UserStore";
import {FriendRequestDto} from "@/domain/friend/dto";
import {Friend} from "@/domain/friend/interface";

export const useFriendStore = defineStore(
  "friend",
  () => {
    const apiClient = ApiClient.getInstance()
    const userStore = useUserStore()
    const friends: Map<number, IUser> = new Map<number, IUser>()

    async function initialize() {
      const myFriends = await apiClient.getMyFriends()
      myFriends.forEach((user) => {
        friends.set(user.id, user);
      });

      friends.forEach((dto) => {
        userStore.addIfAbsent(new User(dto))
      })
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

    async function request(dto: FriendRequestDto) {
      await apiClient.requestFriend(dto)
    }

    async function getReceivedRequest(): Promise<Array<Friend>> {
      return await apiClient.getReceivedFriendRequest()
    }

    async function approveRequest(requestId: number) {
      await apiClient.approveFriendRequest(requestId)
    }

    return {friends, initialize, find, getFriends, request, getReceivedRequest, approveRequest};
  },
  {persist: false}
);
