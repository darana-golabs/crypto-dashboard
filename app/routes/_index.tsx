import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useNavigation, Form } from "@remix-run/react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { getCoinsList, getCoinPrices } from "~/lib/services/coinGecko";
import { filterTargetCoins, combineCoinData } from "~/lib/utils/crypto";
import CryptoCard from "~/components/CryptoCard";
import DashboardControls from "~/components/DashboardControls";
import { useAutoRefresh } from "~/hooks/useAutoRefresh";
import { useCryptocurrencyOrder } from "~/hooks/useCryptocurrencyOrder";
import LoadingSpinner from "~/components/LoadingSpinner";
import ErrorBoundaryComponent from "~/components/ErrorBoundary";
import { requireUser, destroySession, getUserSession } from "~/lib/session.server";
import ThemeToggle from "~/components/ThemeToggle";

const apiKey = process.env.COINGECKO_API_KEY;
const apiUrl = process.env.COINGECKO_API_URL;

export const meta: MetaFunction = () => {
  return [
    { title: "Crypto Dashboard" },
    {
      name: "description",
      content: "Real-time cryptocurrency price tracking",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Require authentication
  await requireUser(request);

  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") || "";
  const refreshInterval = url.searchParams.get("refresh") || "0";

  if (!apiKey || !apiUrl) {
    console.error("Missing environment variables:", {
      apiKey: !!apiKey,
      apiUrl: !!apiUrl,
    });
    throw new Error("Missing CoinGecko API configuration");
  }

  try {
    const coins = await getCoinsList();
    const targetCoins = filterTargetCoins(coins);
    const coinIds = targetCoins.map((coin) => coin.id);
    const prices = await getCoinPrices(coinIds);
    const cryptocurrencies = combineCoinData(targetCoins, prices);

    const filteredCryptocurrencies = searchQuery
      ? cryptocurrencies.filter(
          (crypto) =>
            crypto.name.toLowerCase().includes(searchQuery) ||
            crypto.symbol.toLowerCase().includes(searchQuery)
        )
      : cryptocurrencies;

    return json({
      cryptocurrencies: filteredCryptocurrencies,
      searchQuery,
      refreshInterval: parseInt(refreshInterval),
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    throw new Response("Failed to fetch cryptocurrency data", { status: 500 });
  }
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "logout") {
    const session = await getUserSession(request);
    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return null;
}

export function ErrorBoundary() {
  return <ErrorBoundaryComponent />;
}

export default function Index() {
  const {
    cryptocurrencies: initialCryptocurrencies,
    lastUpdated,
    refreshInterval,
    searchQuery,
  } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  useAutoRefresh(refreshInterval);
  const { cryptocurrencies, handleDragEnd } = useCryptocurrencyOrder(initialCryptocurrencies);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cryptocurrency Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Form method="post">
            <input type="hidden" name="intent" value="logout" />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
            >
              Logout
            </button>
          </Form>
        </div>
      </div>

      <DashboardControls autoRefreshInterval={refreshInterval} />

      <div className="flex items-center gap-4 mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : cryptocurrencies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery
              ? "No cryptocurrencies found matching your search."
              : "No cryptocurrencies available."}
          </p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cryptocurrencies.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cryptocurrencies.map((crypto) => (
                <CryptoCard key={crypto.id} card={crypto} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
