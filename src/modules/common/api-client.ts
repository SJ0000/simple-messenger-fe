import axios, {AxiosResponse} from 'axios'
import {LoginDto, SignUpDto} from "@/modules/auth/dto";

// Singleton
export class ApiClient {

  private static instance: ApiClient;

  private constructor() {
  }

  public static getInstance(): ApiClient {
    if (this.instance === null || this.instance === undefined)
      this.instance = new ApiClient()

    return this.instance
  }


  private client = axios.create({
    headers: {
      'Content-Type': 'application/json',
    }
  })


  async signUp(dto: SignUpDto): Promise<AxiosResponse> {
    return await this.client.post("/api/signup", JSON.stringify(dto))
  }

  async login(dto: LoginDto): Promise<AxiosResponse> {
    return await this.client.post("/api/login", JSON.stringify(dto))
  }

}
