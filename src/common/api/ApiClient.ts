import axios, {AxiosInstance, AxiosResponse} from "axios";
import {LoginRequestDto, LoginResponseDto, SignUpDto} from "@/domain/auth/dto";
import {useAuthenticationStore} from "@/domain/auth/AuthenticationStore";
import {GroupChatCreateDto, GroupChatDto, Invitation, ReceivedGroupMessage} from "@/domain/groupchat/interface";
import {UpdateUserDto, UserDto} from "@/domain/user/dto";
import User from "@/domain/user/User";
import {FriendRequestDto} from "@/domain/friend/dto";
import {Friend} from "@/domain/friend/interface";
import {DirectChatDto, ReceivedDirectMessage} from "@/domain/directchat/interface";
import router from "@/plugins/unplugin-vue-router";
import {NotificationTokenDto} from "@/domain/notification/dto";

export class ApiClient {
  private static instance: ApiClient;

  private client: AxiosInstance;

  private constructor() {
    this.client = this.createAxiosInstance();
  }

  private createAxiosInstance(): AxiosInstance {
    const axiosInstance: AxiosInstance = axios.create();

    axiosInstance.interceptors.request.use(function (request) {
      request.headers.set("Content-Type", "application/json")

      const accessToken = useAuthenticationStore().accessToken;
      if (accessToken !== null) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
      return request;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          useAuthenticationStore().logout();
          await router.push("/")
        }
        if (error.response.status >= 500) {
          // 서버 에러 페이지를 띄우고, 그 페이지에서 버튼을 눌러서 되돌아갈 수 있게
          console.error("server error", error)
          await router.push("/")
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

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await this.client.post("/api/login", dto);
    return response.data
  }

  async createGroupChat(dto: GroupChatCreateDto): Promise<GroupChatDto> {
    const response = await this.client.post<GroupChatDto>(
      "/api/chats/groups",
      dto
    );
    return response.data;
  }

  async joinGroupChat(groupChatId: number): Promise<GroupChatDto> {
    const response = await this.client.post<GroupChatDto>(
      `/api/chats/groups/${groupChatId}/join`
    );
    return response.data;
  }

  async getMyGroupChats(): Promise<GroupChatDto[]> {
    try {
      const response = await this.client.get<GroupChatDto[]>(
        "/api/chats/groups/me"
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getGroupChat(groupChatId: number): Promise<GroupChatDto> {
    const response = await this.client.get<GroupChatDto>(
      `/api/chats/groups/${groupChatId}`
    );
    return response.data;
  }

  async getMyFriends(): Promise<UserDto[]> {
    try {
      const response = await this.client.get<User[]>("/api/friends");
      return response.data;
    } catch (error) {
      console.error(error);
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

  async getDirectChat(id: number): Promise<DirectChatDto> {
    const response = await this.client.get(`/api/chats/directs/${id}`);
    return response.data;
  }

  async getDirectChats(): Promise<DirectChatDto[]> {
    const response = await this.client.get(`/api/chats/directs/me`);
    return response.data;
  }

  async createDirectChats(otherUserId: number): Promise<number> {
    const response = await this.client.post(
      `/api/chats/directs?to=${otherUserId}`
    );
    return response.data;
  }

  async getPreviousGroupMessages(groupChatId: number): Promise<Array<ReceivedGroupMessage>> {
    const response = await this.client.get(`/api/chats/groups/${groupChatId}/messages`)
    return response.data
  }

  async getPreviousDirectMessages(directChatId: number): Promise<Array<ReceivedDirectMessage>> {
    const response = await this.client.get(`/api/chats/groups/${directChatId}/messages`)
    return response.data
  }

  async postNotificationToken(dto: NotificationTokenDto): Promise<AxiosResponse> {
    return await this.client.post(`/api/notifications/tokens`, dto)
  }

  async patchNotificationToken(dto: NotificationTokenDto): Promise<AxiosResponse> {
    return await this.client.patch(`/api/notifications/tokens`, dto)
  }
}
