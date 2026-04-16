export type MessageEventType =
  | "message"
  | "message_reply"
  | "message_unsend"
  | "message_reaction"
  | "event"
  | "read_receipt"
  | "typing"
  | "unknown"
  | "presence";

interface BaseEvent {
  threadID: string;
  messageID: string;
  senderID: string;
  timestamp: number;
  isGroup: boolean;
}

export interface MessageEvent extends BaseEvent {
  type: "message";
  body: string;
  args: string[];
  mentions: Record<string, string>;
  attachments: any[];
}

export interface TypingEvent {
  type: "typing";
  senderID: string;
  threadID: string;
  isTyping: boolean;
  timestamp: number;
}

export interface ReplyEvent extends Omit<MessageEvent, 'type'> {
  type: "message_reply";
  messageReply: {
    messageID: string;
    senderID: string;
    body: string;
    timestamp: number;
    attachments: any[];
  };
}

export interface UnsendEvent extends BaseEvent {
  type: "message_unsend";
  deletionTimestamp: number;
}

export interface ReactionEvent extends Omit<BaseEvent, 'isGroup'> {
  type: "message_reaction";
  reaction: string | undefined;
  action: 'ADD' | 'REMOVE';
  userID: string
}

export interface LogEvent extends BaseEvent {
  type: "event";
  logMessageType: string;
  logMessageData: any;
}

export interface PresenceEvent {
  type: "presence";
  userID: string;
  timestamp: number;
  statuses: {
    status: "active" | "idle";
    lastActiveTimestamp: number;
    capabilities: number;
  };
}

export type AppEvent = MessageEvent | ReplyEvent | UnsendEvent | ReactionEvent | LogEvent | PresenceEvent | TypingEvent;