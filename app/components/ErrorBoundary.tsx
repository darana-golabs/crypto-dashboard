import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {error.status} {error.statusText}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error.data}</p>
          <a
            href="/"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Go back home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred"}
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
