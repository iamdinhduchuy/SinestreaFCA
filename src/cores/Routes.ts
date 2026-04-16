import listenMqtt from "@/routes/sockets/listenMqtt";
import getCurrentUserID from "@/routes/users/getCurrentUserID";

export default function initializeRoutes(): API {
  const routes: API = {
    sockets: {
      listenMqtt: listenMqtt,
    },
    users: {
      getCurrentUserID: getCurrentUserID,
    },
  };

  return routes;
}
