import {Exclude, Expose} from "class-transformer";

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  statusMessage: string;
  publicIdentifier: string;
}

export default class User implements IUser {
  @Exclude() private readonly _id: number;
  @Exclude() private _name: string;
  @Exclude() private readonly _email: string;
  @Exclude() private _avatarUrl: string;
  @Exclude() private _statusMessage: string;
  @Exclude() private _publicIdentifier: string;

  constructor(iUser: IUser) {
    this._id = iUser.id;
    this._name = iUser.name;
    this._email = iUser.email;
    this._avatarUrl = iUser.avatarUrl;
    this._statusMessage = iUser.statusMessage;
    this._publicIdentifier = iUser.publicIdentifier;
  }

  @Expose()
  public get id(): number {
    return this._id;
  }

  @Expose()
  public get name(): string {
    return this._name;
  }

  @Expose()
  public get email(): string {
    return this._email;
  }

  @Expose()
  public get avatarUrl(): string {
    return this._avatarUrl;
  }

  @Expose()
  public get statusMessage(): string {
    return this._statusMessage;
  }

  @Expose()
  public get publicIdentifier(): string {
    return this._publicIdentifier;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set avatarUrl(value: string) {
    this._avatarUrl = value;
  }

  public set statusMessage(value: string) {
    this._statusMessage = value;
  }

  public set publicIdentifier(value: string) {
    this._publicIdentifier = value;
  }
}
