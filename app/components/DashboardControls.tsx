import { useSearchParams } from "@remix-run/react";

interface DashboardControlsProps {
  autoRefreshInterval: number;
}

const REFRESH_INTERVALS = [
  { label: "No auto-refresh", value: 0 },
  { label: "30 seconds", value: 30_000 },
  { label: "1 minute", value: 60_000 },
  { label: "5 minutes", value: 300_000 },
  { label: "15 minutes", value: 900_000 },
];

export default function DashboardControls({
  autoRefreshInterval,
}: DashboardControlsProps) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <form method="get" action="/dashboard" className="flex gap-2">
          <input
            type="search"
            name="q"
            placeholder="Search by name or symbol..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            defaultValue={searchQuery}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex gap-2">
        <form method="get" action="/dashboard">
          {searchQuery && <input type="hidden" name="q" value={searchQuery} />}
          <button
            type="submit"
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Refresh
          </button>
        </form>

        <form method="get" action="/dashboard" className="relative">
          {searchQuery && <input type="hidden" name="q" value={searchQuery} />}
          <select
            name="refresh"
            defaultValue={autoRefreshInterval}
            onChange={(e) => {
              const form = e.currentTarget.form;
              if (form) {
                form.submit();
              }
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            {REFRESH_INTERVALS.map((interval) => (
              <option key={interval.value} value={interval.value}>
                {interval.label}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
}
