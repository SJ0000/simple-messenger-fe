import axios, {AxiosInstance, AxiosResponse} from "axios";
import {LoginDto, SignUpDto} from "@/modules/auth/dto";
import {useAuthenticationStore} from "@/store/AuthenticationStore";
import {GroupChat, Invitation, ReceivedMessage} from "@/modules/groupchat/interface";
import {GroupChatCreateDto} from "@/modules/groupchat/dto";
import {UpdateUserDto} from "../user/dto";
import {User} from "../user/interface";
import {FriendRequestDto} from "../friend/dto";
import {Friend} from "../friend/interface";
import {DirectChat, ReceivedDirectMessage} from "../directchat/interface";

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

  async createGroupChat(dto: GroupChatCreateDto): Promise<GroupChat> {
    const response = await this.client.post<GroupChat>(
      "/api/chats/groups",
      dto
    );
    return response.data;
  }

  async joinGroupChat(groupChatId: number): Promise<GroupChat> {
    const response = await this.client.post<GroupChat>(
      `/api/chats/groups/${groupChatId}/join`
    );
    return response.data;
  }

  async getMyGroupChats(): Promise<GroupChat[]> {
    try {
      const response = await this.client.get<GroupChat[]>(
        "/api/chats/groups/me"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getGroupChat(groupChatId: number): Promise<GroupChat> {
    const response = await this.client.get<GroupChat>(
      `/api/chats/groups/${groupChatId}`
    );
    return response.data;
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

  async createInvitation(groupChatId: number): Promise<Invitation> {
    const response = await this.client.post(
      `/api/chats/groups/${groupChatId}/invites`
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
    return await this.client.patch(`/api/friends/requests/${id}/approve`);
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

  async getPreviousGroupMessages(groupChatId : number) : Promise<Array<ReceivedMessage>>{
    const response = await this.client.get(`/api/chats/groups/${groupChatId}/messages`)
    return response.data
  }

  async getPreviousDirectMessages(directChatId : number) : Promise<Array<ReceivedDirectMessage>>{
    const response = await this.client.get(`/api/chats/groups/${directChatId}/messages`)
    return response.data
  }
}