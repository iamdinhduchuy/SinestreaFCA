interface SocketsNamespace {
  listenMqtt: (err: Error, callback: Function) => void;
}

export interface APIRoutes {
  sockets: SocketsNamespace;
}
