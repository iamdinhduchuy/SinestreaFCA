import getCurrentUserID from "@/routes/users/getCurrentUserID";

export default function initializeRoutes(): APIRoutes {
  const routes: APIRoutes = {
    socket: {},
    users: {
      getCurrentUserID: getCurrentUserID,
    },
  };

  return routes;
}
