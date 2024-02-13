export class UserDto {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class UpdateUserDto {
  name: string;
  avatarUrl: string;
  statusMessage: string;

  constructor(name: string, avatarUrl: string, statusMessage: string) {
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.statusMessage = statusMessage;
  }
}
