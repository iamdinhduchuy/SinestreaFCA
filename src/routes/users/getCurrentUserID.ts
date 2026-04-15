import { RouteGetCurrentUserID } from "@/@types/route";
import ContextInstance from "@/context";

const getCurrentUserID: RouteGetCurrentUserID = () => {
  return ContextInstance.userID!;
};

export default getCurrentUserID;
