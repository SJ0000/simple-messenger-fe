import useAuthenticationStore from "@/domain/auth/AuthenticationStore";
import {jwtDecode} from "jwt-decode";

const authRequiredPaths = ["/messenger", "/account"];

export function authenticationGuard(to: any, from: any, next: any) {
  const authentication = useAuthenticationStore();
  if (!isAuthenticationTargetPath(to.path)) {
    next();
    return;
  }

  if (!authentication.isLoggedIn) {
    next("/");
    return;
  }

  if (isExpiredAccessToken(authentication.getAccessToken())) {
    authentication.logout();
    next("/");
    return;
  }

  next();
}

function isAuthenticationTargetPath(path: string): boolean {
  return authRequiredPaths.find((target) => path === target) !== undefined;
}

function isExpiredAccessToken(token: string): boolean {
  const tokenExpiredAt = jwtDecode(token).exp;
  if (tokenExpiredAt === undefined)
    throw Error("JWT Parse Error. exp undefined");

  const currentTimeSeconds = Math.floor(new Date().getTime() / 1000);
  return tokenExpiredAt < currentTimeSeconds;
}
