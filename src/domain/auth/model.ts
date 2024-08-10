import {LoginRequestDto, SignUpDto} from "@/domain/auth/dto";
import User from "@/domain/user/User";
import {UpdateUserDto} from "../user/dto";

export class SignUpModel {
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  toDto(): SignUpDto {
    return new SignUpDto(this.name, this.email, this.password);
  }
}

export class LoginModel {
  email: string = "";
  password: string = "";

  toDto(): LoginRequestDto {
    return new LoginRequestDto(this.email, this.password);
  }
}

export class UpdateUserModel {
  name: string;
  avatarUrl: string;
  statusMessage: string;
  publicIdentifier: string;

  constructor(user: User) {
    this.name = user.name;
    this.avatarUrl = user.avatarUrl;
    this.statusMessage = user.statusMessage;
    this.publicIdentifier = user.publicIdentifier;
  }

  toDto(): UpdateUserDto {
    return new UpdateUserDto(
      this.name,
      this.avatarUrl,
      this.statusMessage,
      this.publicIdentifier
    );
  }
}
