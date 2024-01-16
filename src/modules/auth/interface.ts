import {User} from "@/modules/user/interface";

export interface Authentication{
  isLoggedIn : boolean
  user : User | null
  accessToken: string | null
}
