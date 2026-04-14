import { APIRoutes } from "./api.d.ts";
import { AppState } from "./types.d.ts";

type LoginArgs =
  | [appState: AppState]
  | [cookies: string]
  | [username: string, password: string, twoFA?: string];

export interface LoginInterface {
  (...args: LoginArgs): Promise<API>;
}
