import axios, { AxiosInstance, AxiosResponse } from "axios";
import { LoginDto, SignUpDto } from "@/modules/auth/dto";
import { useAuthenticationStore } from "@/store/authentication";
import { ChatRoom, Invitation } from "@/modules/chat/interface";
import { ChatRoomCreateDto } from "@/modules/chat/dto";
import { UpdateUserDto } from "../user/dto";
import { User } from "../user/interface";
import { FriendRequestDto } from "../friend/dto";
import { Friend } from "../friend/interface";
import { DirectChat } from "../directchat/interface";

// Singleton
export class ApiClient {
  private static instance: ApiClient;

  private client: AxiosInstance;

  private constructor() {
    this.client = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    const axiosInstance: AxiosInstance = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });

    axiosInstance.interceptors.request.use(function (config) {
      const accessToken = useAuthenticationStore().accessToken;
      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          useAuthenticationStore().logout();
        }
        return Promise.reject(error);
      }
    );
    return axiosInstance;
  }

  public static getInstance(): ApiClient {
    if (this.instance === null || this.instance === undefined)
      this.instance = new ApiClient();

    return this.instance;
  }

  async signUp(dto: SignUpDto): Promise<AxiosResponse> {
    return await this.client.post("/api/signup", JSON.stringify(dto));
  }

  async login(dto: LoginDto): Promise<AxiosResponse> {
    return await this.client.post("/api/login", JSON.stringify(dto));
  }

  async createChatRoom(dto: ChatRoomCreateDto): Promise<ChatRoom> {
    const response = await this.client.post<ChatRoom>("/api/chats/groups", dto);
    return response.data;
  }

  async joinChatRoom(chatRoomId: number): Promise<ChatRoom> {
    const response = await this.client.post<ChatRoom>(
      `/api/chats/groups/${chatRoomId}/join`
    );
    return response.data;
  }

  async getMyChatRooms(): Promise<ChatRoom[]> {
    try {
      const response = await this.client.get<ChatRoom[]>(
        "/api/chats/groups/me"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getChatRoom(chatRoomId: number): Promise<ChatRoom> {
    try {
      const response = await this.client.get<ChatRoom>(
        `/api/chats/groups/${chatRoomId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getMyFriends(): Promise<User[]> {
    try {
      const response = await this.client.get<User[]>("/api/friends");
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getInvitation(invitationId: string): Promise<Invitation> {
    const response = await this.client.get(
      `/api/chats/groups/invites/${invitationId}`
    );
    return response.data;
  }

  async createInvitation(chatRoomId: number): Promise<Invitation> {
    const response = await this.client.post(
      `/api/chats/groups/${chatRoomId}/invites`
    );
    return response.data;
  }

  async patchUser(userId: number, dto: UpdateUserDto): Promise<User> {
    const response = await this.client.patch(`/api/users/${userId}`, dto);
    return response.data;
  }

  async requestFriend(dto: FriendRequestDto): Promise<AxiosResponse> {
    return await this.client.post(`/api/friends`, dto);
  }

  async getReceivedFriendRequest(): Promise<Friend[]> {
    const response = await this.client.get(`/api/friends/requests`);
    return response.data;
  }

  async approveFriendRequest(id: number): Promise<AxiosResponse> {
    return await this.client.patch(`/api/friends/${id}/approve`);
  }

  async getDirectChat(id: number): Promise<DirectChat> {
    const response = await this.client.get(`/api/chats/directs/${id}`);
    return response.data;
  }

  async getDirectChats(): Promise<DirectChat[]> {
    const response = await this.client.get(`/api/chats/directs/me`);
    return response.data;
  }

  async createDirectChats(otherUserId: number): Promise<number> {
    const response = await this.client.post(
      `/api/chats/directs?to=${otherUserId}`
    );
    return response.data;
  }
}
