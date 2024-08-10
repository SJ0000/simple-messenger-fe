import {FriendRequestDto} from "./dto";

export class FriendRequestModel {
  receiverPublicIdentifier: string = "";

  toDto(): FriendRequestDto {
    return new FriendRequestDto(this.receiverPublicIdentifier);
  }

  clear() {
    this.receiverPublicIdentifier = "";
  }
}
