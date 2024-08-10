import {defineStore} from "pinia";
import User, {IUser} from "@/domain/user/User";
import {ApiClient} from "@/common/api/ApiClient";
import {useUserStore} from "@/domain/user/UserStore";

export const useInvitationStore = defineStore(
  "invitation",
  () => {
    const apiClient = ApiClient.getInstance()

    async function get(id: string){
        return await apiClient.getInvitation(id)
    }

    async function create(groupChatId: number){
      return await apiClient.createInvitation(groupChatId)
    }

    return {get, create};
  },
  {persist: false}
);
