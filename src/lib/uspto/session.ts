/**
 * This repository has no customer sign-in. Do not read a tenant id from
 * the request body, query string, or a client-set header. A future session
 * verifier belongs in this function and must run only on the server.
 * USPTO_AUTH_CONFIGURED does not turn on a placeholder session.
 */
export async function getServerTenantId(): Promise<string | null> {
  return null;
}
