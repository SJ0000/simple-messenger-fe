import User from "@/domain/user/User";

export interface Friend {
  id: number;
  fromUser: User;
  receivedAt: Date;
}
