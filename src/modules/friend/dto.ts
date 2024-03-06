export class FriendRequestDto {
  publicIdentifier: string;

  constructor(receiverPublicIdentifier: string) {
    this.publicIdentifier = receiverPublicIdentifier;
  }
}
