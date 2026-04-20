import { useHoldings } from './hooks/useHoldings';
import { useCapitalGains } from './hooks/useCapitalGains';
import { HarvestingProvider } from './context/HarvestingContext';
import { PreHarvestingCard } from './components/PreHarvestingCard';
import { AfterHarvestingCard } from './components/AfterHarvestingCard';
import { HoldingsTable } from './components/HoldingsTable';
import { ImportantNotes } from './components/ImportantNotes';
import { CardSkeleton, TableSkeleton } from './components/ui/Skeleton';
import { ErrorState } from './components/ui/ErrorState';

function App() {
  const { holdings, loading: holdingsLoading, error: holdingsError, retry: retryHoldings } = useHoldings();
  const { capitalGains, loading: gainsLoading, error: gainsError, retry: retryGains } = useCapitalGains();

  const loading = holdingsLoading || gainsLoading;
  const error = holdingsError || gainsError;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-koinx-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">KoinX</h1>
          <span className="text-sm text-gray-500 ml-2">Tax Loss Harvesting</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <ImportantNotes />

        {error ? (
          <ErrorState message={error} onRetry={() => { retryHoldings(); retryGains(); }} />
        ) : (
          <HarvestingProvider preHarvesting={capitalGains} holdings={holdings}>
            {loading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
                <TableSkeleton />
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {capitalGains && <PreHarvestingCard capitalGains={capitalGains} />}
                  <AfterHarvestingCard />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Holdings</h2>
                  <HoldingsTable holdings={holdings} />
                </div>
              </>
            )}
          </HarvestingProvider>
        )}
      </main>
    </div>
  );
}

export default App;
