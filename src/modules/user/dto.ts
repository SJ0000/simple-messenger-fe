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

  constructor(name: string, avatarUrl: string) {
    this.name = name;
    this.avatarUrl = avatarUrl;
  }
}
