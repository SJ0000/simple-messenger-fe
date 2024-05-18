import User from "@/modules/user/User";

export interface Friend {
  id: number;
  fromUser: User;
  receivedAt: Date;
}
