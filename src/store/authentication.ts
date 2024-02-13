import { defineStore } from "pinia";
import { Authentication } from "@/modules/auth/interface";
import { User } from "@/modules/user/interface";

export const authenticationStore = defineStore("authentication", {
  state: (): Authentication => {
    return {
      isLoggedIn: false,
      user: null,
      accessToken: null,
    };
  },
  actions: {
    login(accessToken: string, user: User) {
      this.isLoggedIn = true;
      this.user = {
        id: user.id,
        name: user.name,
        avatarUrl:
          user.avatarUrl.length !== 0
            ? user.avatarUrl
            : "https://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon",
      };
      this.accessToken = accessToken;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.accessToken = null;
    },
    getAccessToken(): string {
      if (this.accessToken === null) throw Error("accessToken is null");
      return this.accessToken;
    },
    getUser(): User {
      if (this.user === null) throw Error("User is null");
      return this.user;
    },
    updateUser(user: User) {
      this.user = {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      };
    },
  },
  persist: true,
});
