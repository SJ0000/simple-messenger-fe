export interface ChatRoom{
  id: number,
  title: string,
  avatarUrl: string,
  lastMessage : {
    senderName: string,
    content: string
  }
}
