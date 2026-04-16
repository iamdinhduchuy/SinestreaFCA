process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

import { LoginArgs } from "./@types/index-entry";
import ClientConfig from "./client/ClientConfig";
import { injectCookies } from "./client/cookieJar";
import ContextInstance from "./context";
import FacebookCore from "./cores/Facebook";
import initializeRoutes from "./cores/Routes";
import utils from "./utils";
import { logger } from "./utils/log";

interface LoginResponse {
  status: boolean;
  message: string;
  api?: API;
}

const Login = async (...args: LoginArgs): Promise<LoginResponse> => {
  let cookieString: string | undefined;

  if (args.length === 1 && Array.isArray(args[0])) {
    const appState: AppState = args[0];

    cookieString = utils.convert.appStateToCookieString(appState);
  } else if (args.length >= 2) {
    const [email, password] = args as [string, string];

    // handle login with email and password here
  } else if (args.length === 1 && typeof args[0] === "string") {
    cookieString = args[0];
  } else throw new Error("Invalid arguments for login");

  if (!cookieString) throw new Error("No cookie string provided for login");

  try {
    const result = await injectCookies(cookieString);
    if (result) {
      logger("success", "Inject cookies to jar successfully");
    } else {
      logger("Error", "Failed to inject cookies to jar");
      throw new Error("Failed to inject cookies to jar");
    }
  } catch (error) {
    logger("error", "Failed to inject cookies to jar");
    return {
      status: false,
      message: "Failed to inject cookies to jar",
    };
  }

  try {
    const coreContext = await FacebookCore.getFullContext();

    if (!coreContext) {
      logger("error", "Failed to get security parameters from Facebook");
      throw new Error("Failed to get security parameters from Facebook");
    }

    if(coreContext.lastSeqId === -1) {
      logger("error", "Failed to retrieve Sequence ID, account may be checkpointed");
      return {
        status: false,
        message: "Failed to retrieve Sequence ID, account may be checkpointed",
      };
    }

    ContextInstance.setSequenceID(Number(coreContext.lastSeqId || -1));
    ContextInstance.fb_dtsg = coreContext.fb_dtsg || null;
    ContextInstance.jazoest = coreContext.jazoest || null;
    ContextInstance.lsd = coreContext.lsd || null;
    ContextInstance.userID = coreContext.uid || null;
  } catch (e) {
    return {
      status: false,
      message: "Failed to retrieve security parameters from Facebook, possibly due to checkpointed account",
    };
  }

  logger(
    "success",
    `Login successfully with user ID: ${ContextInstance.userID}`,
  );

  let clientConfigInitResult = ClientConfig.init();

  if (clientConfigInitResult) {
    logger("success", "Config profile loaded successfully");
  } else {
    logger("error", "Failed to load config profile, using default config");
  }

  const api: API = initializeRoutes();
  logger("success", "Routes loaded successfully");
  return { status: true, message: "Login successful", api };
};

export default Login satisfies Login;
