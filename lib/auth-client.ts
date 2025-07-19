import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000"
});

// 特定のメソッドをエクスポートすることもできます
export const { signIn, signUp, signOut, useSession } = authClient;
