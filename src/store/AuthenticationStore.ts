import {defineStore, StateTree} from "pinia";
import User from "@/modules/user/User";
import {Ref, ref} from "vue";
import {instanceToPlain, plainToInstance} from "class-transformer";
import 'reflect-metadata';

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
      user.value = new User(data.id, data.name, data.email, data.avatarUrl, data.statusMessage, data.publicIdentifier);
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
  {
    persist: {
      serializer:{
        serialize: (value) : string => {
          return JSON.stringify({
            isLoggedIn: value.isLoggedIn,
            accessToken: value.accessToken,
            user: instanceToPlain(value.user)
          })
        },
        deserialize: (value): StateTree => {
          const deserialized = JSON.parse(value)
          deserialized.user = plainToInstance(User, deserialized.user)
          return deserialized
        }
      }
    }
  }
);
