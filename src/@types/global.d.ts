import { APIRoutes } from "./api.d.ts";
import { LoginInterface, AppState } from "./types.d.ts";

declare global {
  type AppState = AppState;
  type AppEvent = AppEvent;
  interface API extends APIRoutes {}
  interface Login extends LoginInterface {}
}
