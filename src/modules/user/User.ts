import {UserDto} from "@/modules/user/dto";
import {Exclude, Expose} from "class-transformer";

export default class User{
  @Exclude() private _id: number;
  @Exclude() private _name: string;
  @Exclude() private _email: string;
  @Exclude() private _avatarUrl: string;
  @Exclude() private _statusMessage: string;
  @Exclude() private _publicIdentifier: string;

  constructor(id: number, name: string, email: string, avatarUrl: string, statusMessage:string, publicIdentifier: string){
    this._id = id;
    this._name = name;
    this._email = email;
    this._avatarUrl = avatarUrl;
    this._statusMessage = statusMessage;
    this._publicIdentifier = publicIdentifier;
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

  private set id(value: number) {
    this._id = value;
  }

  private set email(value: string) {
    this._email = value;
  }
}
