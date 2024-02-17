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
      this.accessToken = accessToken;
      this.updateUser(user);
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
        email: user.email,
        avatarUrl: user.avatarUrl,
        statusMessage: user.statusMessage,
        publicIdentifier: user.publicIdentifier,
      };
    },
  },
  persist: true,
});
