import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {LoginDto, SignUpDto} from "@/modules/auth/dto";
import {authenticationStore} from "@/store/authentication";
import {ChatRoom, Invitation} from "@/modules/chat/interface";
import {ChatRoomCreateDto} from "@/modules/chat/dto";

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
        'Content-Type': 'application/json',
      }
    })

    axiosInstance.interceptors.request.use(function (config) {
      const accessToken = authenticationStore().accessToken
      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    })

    axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response.status === 401) {
          authenticationStore().logout()
        }
        return Promise.reject(error)
      }
    )
    return axiosInstance
  }


  public static getInstance(): ApiClient {
    if (this.instance === null || this.instance === undefined)
      this.instance = new ApiClient()

    return this.instance
  }

  async signUp(dto: SignUpDto): Promise<AxiosResponse> {
    return await this.client.post("/api/signup", JSON.stringify(dto))
  }

  async login(dto: LoginDto): Promise<AxiosResponse> {
    return await this.client.post("/api/login", JSON.stringify(dto))
  }

  async createChatRoom(dto: ChatRoomCreateDto): Promise<ChatRoom> {
    const response = await this.client.post<ChatRoom>("/api/chatrooms", dto)
    return response.data
  }

  async joinChatRoom(chatRoomId: number): Promise<ChatRoom> {
    const response = await this.client.post<ChatRoom>(`/api/chatrooms/${chatRoomId}/join`)
    return response.data
  }

  async getMyChatRooms(): Promise<ChatRoom[]> {
    try {
      const response = await this.client.get<ChatRoom[]>("/api/chatrooms/me")
      return response.data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async getInvitation(invitationId: string): Promise<Invitation> {
    const response = await this.client.get(`/api/chat/invite/${invitationId}`)
    return response.data
  }

  async createInvitation(chatRoomId: number): Promise<Invitation> {
    const response = await this.client.post(`/api/chatrooms/${chatRoomId}/invites`)
    return response.data
  }
}
