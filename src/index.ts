import { LoginArgs } from "./@types/index-entry";
import ClientConfig from "./client/ClientConfig";
import { injectCookies } from "./client/cookieJar";
import ContextInstance from "./context";
import FacebookCore from "./cores/Facebook";
import initializeRoutes from "./cores/Routes";
import utils from "./utils";
import { logger } from "./utils/log";

const Login = async (...args: LoginArgs) => {
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

  logger("info", "Try to find cookie for login...");

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
  }

  const coreContext = await FacebookCore.getFullContext();

  if (!coreContext) {
    logger("error", "Failed to get security parameters from Facebook");
    throw new Error("Failed to get security parameters from Facebook");
  }

  ContextInstance.setSequenceID(Number(coreContext.lastSeqId || -1));
  ContextInstance.fb_dtsg = coreContext.fb_dtsg || null;
  ContextInstance.jazoest = coreContext.jazoest || null;
  ContextInstance.lsd = coreContext.lsd || null;
  ContextInstance.userID = coreContext.uid || null;

  logger(
    "success",
    `Login successfully with user ID: ${ContextInstance.userID}`,
  );

  logger("info", "Try to loading config profile...");
  let clientConfigInitResult = ClientConfig.init();

  if (clientConfigInitResult) {
    logger("success", "Config profile loaded successfully");
  } else {
    logger("error", "Failed to load config profile, using default config");
  }

  logger("info", "Start to load routes...");
  const api = initializeRoutes();
  logger("success", "Routes loaded successfully");

  return api;
};

export default Login;
