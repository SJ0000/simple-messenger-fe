import {ReceivedMessage} from "@/modules/groupchat/interface";

export default class GroupChat{

  private readonly _id: number;
  private readonly _name: string;
  private readonly _avatarUrl: string;
  private readonly _participantIds: Set<number>;
  private readonly _messages: ReceivedMessage[];

  constructor(id: number, name: string, avatarUrl: string) {
    this._id = id;
    this._name = name;
    this._avatarUrl = avatarUrl;
    this._participantIds = new Set<number>();
    this._messages = [];
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get avatarUrl(): string {
    return this._avatarUrl;
  }

  public get participantIds(): Set<number> {
    return this._participantIds;
  }

  public get messages(): ReceivedMessage[] {
    return this._messages;
  }

  public addParticipant(...userIds: number[]){
    userIds.forEach( userId => {
      this._participantIds.add(userId)
    })
  }

  public addMessage(message: ReceivedMessage){
    this._messages.push(message)
  }
}
