import {ReceivedDirectMessage} from "@/modules/directchat/interface";

export interface IDirectChat{
  readonly id : number
  readonly otherUserId: number
  readonly messages : ReceivedDirectMessage[]
}

export default class DirectChat{
  private readonly _id: number
  private readonly _otherUserId: number
  private readonly _messages: ReceivedDirectMessage[]

  constructor(id: number, otherUserId : number) {
    this._id = id;
    this._otherUserId = otherUserId;
    this._messages = []
  }

  get id(): number {
    return this._id;
  }

  get otherUserId(): number {
    return this._otherUserId;
  }

  get messages(): ReceivedDirectMessage[] {
    return this._messages;
  }
}
