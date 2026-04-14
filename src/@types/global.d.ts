import { APIRoutes } from "./api.d.ts";
import { LoginInterface, AppState } from "./types.d.ts";

declare global {
  type AppState = AppState;
  interface APIRoutes extends APIRoutes {}
  interface LoginInterface extends LoginInterface {}
}
