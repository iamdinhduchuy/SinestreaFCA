import type { AppEvent } from "./event.d.ts";
import type { MqttClient } from "mqtt";

export type ListenMqttCallback = (error: Error | null, event: AppEvent) => void;

interface SocketsNamespace {
  listenMqtt: (callback?: ListenMqttCallback) => Promise<MqttClient>;
}

interface UsersNamespace {
  getCurrentUserID: () => string;
}

export interface APIRoutes {
  sockets: SocketsNamespace;
  users: UsersNamespace;
}
