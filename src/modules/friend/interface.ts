import { User } from "../user/interface";

export interface Friend {
  id: number;
  fromUser: User;
  receivedAt: Date;
}
