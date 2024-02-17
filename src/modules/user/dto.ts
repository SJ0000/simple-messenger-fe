export class UpdateUserDto {
  name: string;
  avatarUrl: string;
  statusMessage: string;
  publicIdentifier: string;

  constructor(
    name: string,
    avatarUrl: string,
    statusMessage: string,
    publicIdentifier: string
  ) {
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.statusMessage = statusMessage;
    this.publicIdentifier = publicIdentifier;
  }
}
