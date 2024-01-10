import {SignUpDto} from "@/modules/auth/dto";

export class SignUpModel{
  name : string = "";
  email : string = "";
  password : string = "";
  confirmPassword : string = "";

  toDto() : SignUpDto{
    return new SignUpDto(this.name, this.email, this.password);
  }
}
