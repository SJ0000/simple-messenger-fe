import { defineStore } from "pinia";
import { User } from "@/modules/user/interface";
import { Ref, ref } from "vue";

export const useAuthenticationStore = defineStore(
  "authentication",
  () => {
    const isLoggedIn: Ref<boolean> = ref(false);
    const user: Ref<User | null> = ref(null);
    const accessToken: Ref<string | null> = ref(null);

    function login(jwt: string, user: User) {
      isLoggedIn.value = true;
      accessToken.value = jwt;
      updateUser(user);
    }

    function logout() {
      isLoggedIn.value = false;
      user.value = null;
      accessToken.value = null;
    }

    function getAccessToken(): string {
      if (accessToken.value === null) throw Error("accessToken is null");
      return accessToken.value;
    }

    function getUser(): User {
      if (user.value === null) throw Error("User is null");
      return user.value;
    }

    function updateUser(data: User) {
      user.value = {
        id: data.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
        statusMessage: data.statusMessage,
        publicIdentifier: data.publicIdentifier,
      };
    }

    return {
      isLoggedIn,
      accessToken,
      user,
      login,
      logout,
      getAccessToken,
      getUser,
      updateUser,
    };
  },
  { persist: true }
);
