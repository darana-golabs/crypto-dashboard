import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  redirect,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getUserSession } from "~/lib/session.server";
import { useThemeStore } from "~/lib/stores/themeStore";
import ThemeToggle from "~/components/ThemeToggle";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getUserSession(request);
  const isAuthenticated = session.has("userId");
  const url = new URL(request.url);
  const isLoginPage = url.pathname === "/login";

  if (!isAuthenticated && !isLoginPage) {
    return redirect("/login");
  }

  if (isAuthenticated && isLoginPage) {
    return redirect("/");
  }

  return { isAuthenticated };
}

export default function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { theme } = useThemeStore();

  return (
    <html lang="en" className={`${theme} antialiased`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Crypto Dashboard</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        {isLoginPage && (
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
        )}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
