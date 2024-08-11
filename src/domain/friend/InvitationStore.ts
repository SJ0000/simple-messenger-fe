import {defineStore} from "pinia";
import ApiClient from "@/common/api/ApiClient";

const useInvitationStore = defineStore(
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

export default useInvitationStore
