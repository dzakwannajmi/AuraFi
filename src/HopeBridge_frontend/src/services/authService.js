import { AuthClient } from "@dfinity/auth-client";

let authClient = null;

export async function initAuthClient() {
  authClient = await AuthClient.create();
  return authClient;
}

export async function login() {
  await authClient.login({
    identityProvider: "https://identity.ic0.app",
    onSuccess: () => {
      window.location.reload();
    },
  });
}

export function logout() {
  authClient.logout();
  window.location.reload();
}

export async function isAuthenticated() {
  return await authClient?.isAuthenticated();
}

export function getIdentity() {
  return authClient?.getIdentity();
}
