interface SocketsNamespace {
  listenMqtt: (err: Error, callback: Function) => void;
}

interface UsersNamespace {
  getCurrentUserID: () => string;
}

export interface APIRoutes {
  sockets: SocketsNamespace;
  users: UsersNamespace;
}
