export class FriendRequestDto {
  recipient: string;

  constructor(receiverPublicIdentifierame: string) {
    this.recipient = receiverPublicIdentifierame;
  }
}
