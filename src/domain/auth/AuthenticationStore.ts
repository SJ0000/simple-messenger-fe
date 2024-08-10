import {defineStore, StateTree} from "pinia";
import User from "@/domain/user/User";
import {computed, Ref, ref} from "vue";
import {instanceToPlain, plainToInstance} from "class-transformer";
import 'reflect-metadata';
import {ApiClient} from "@/common/api/ApiClient";
import {LoginRequestDto} from "@/domain/auth/dto";

export const useAuthenticationStore = defineStore(
  "authentication",
  () => {
    const user: Ref<User | undefined> = ref(undefined);
    const accessToken: Ref<string | undefined> = ref(undefined);
    const isLoggedIn = computed(() => user.value !== undefined)

    async function login(loginRequestDto: LoginRequestDto){
      const apiClient = ApiClient.getInstance()
      const loginResponse = await apiClient.login(loginRequestDto)
      accessToken.value = loginResponse.token
      updateUser(loginResponse.user)
    }

    function logout() {
      user.value = undefined;
      accessToken.value = undefined;
    }

    function getAccessToken(): string {
      if (accessToken.value === undefined) throw Error("accessToken is null");
      return accessToken.value;
    }

    function getUser(): User {
      if (user.value === undefined) throw Error("User is null");
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
