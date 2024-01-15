import axios, {AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse} from 'axios'
import {LoginDto, SignUpDto} from "@/modules/auth/dto";
import {ACCESS_TOKEN} from "@/modules/common/LocalStorageKeyNames";

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
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    })

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

}
