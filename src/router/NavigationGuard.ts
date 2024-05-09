import { useAuthenticationStore } from "@/store/authentication";

const authRequiredPaths = ["/messenger", "/account"];

export function authenticationGuard(to: any, from: any, next: any) {
  const authentication = useAuthenticationStore();
  if (isAuthenticationTargetPath(to.path)) {
    next();
    return;
  }

  if (!authentication.isLoggedIn) {
    next("/");
    return;
  }

  next();
}

function isAuthenticationTargetPath(path: string): boolean {
  return authRequiredPaths.find((target) => path === target) !== undefined;
}
