import {ReceivedDirectMessage} from "@/domain/directchat/interface";
import {ReceivedGroupMessage} from "@/domain/groupchat/interface";

export type MessageHandler<T> = (message: T) => void

export class MessageEventBus extends EventTarget {
  constructor() {
    super();
  }

  addDirectMessageEventListener(handler: MessageHandler<ReceivedDirectMessage>) {
    const callback = this.createCallback(handler);
    super.addEventListener("direct-message", callback)
  }

  addGroupMessageEventListener(handler: MessageHandler<ReceivedGroupMessage>) {
    const callback = this.createCallback(handler);
    super.addEventListener("group-message", callback)
  }

  dispatchDirectMessageEvent(detail: ReceivedDirectMessage) {
    const customEvent = new CustomEvent("direct-message", {detail})
    this.dispatchEvent(customEvent)
  }

  dispatchGroupMessageEvent(detail: ReceivedGroupMessage) {
    const customEvent = new CustomEvent("group-message", {detail})
    this.dispatchEvent(customEvent)
  }

  private createCallback<T>(handler: MessageHandler<T>) {
    return (event: Event) => {
      const customEvent = event as CustomEvent
      handler(customEvent.detail as T)
    }
  }
}
