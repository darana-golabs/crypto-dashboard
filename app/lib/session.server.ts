import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "crypto_dashboard_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "default-secret"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return session;
}

export async function requireUser(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return userId;
} 