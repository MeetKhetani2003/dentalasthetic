import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "dermadent_admin_session";
const SESSION_SECRET = "dermadent_authenticated_session_key_2026";

export async function isVerifiedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return token === SESSION_SECRET;
}

export function getAuthCookieDetails() {
  return {
    name: AUTH_COOKIE_NAME,
    secret: SESSION_SECRET,
  };
}
