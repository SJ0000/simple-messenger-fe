export interface ChatRoom{
  id: number,
  title: string,
  avatarUrl: string,
  lastMessage : {
    senderName: string,
    content: string
  }
}

export interface Message{
  id: number,
  senderId: number,
  content: string,
  sentAt: Date,
}
