import { useHoldings } from './hooks/useHoldings';
import { useCapitalGains } from './hooks/useCapitalGains';
import { HarvestingProvider } from './context/HarvestingContext';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeToggle } from './components/ThemeToggle';
import { CurrencySelector } from './components/CurrencySelector';
import { PreHarvestingCard } from './components/PreHarvestingCard';
import { AfterHarvestingCard } from './components/AfterHarvestingCard';
import { HoldingsTable } from './components/HoldingsTable';
import { ImportantNotes } from './components/ImportantNotes';
import { CardSkeleton, TableSkeleton } from './components/ui/Skeleton';
import { ErrorState } from './components/ui/ErrorState';

function AppContent() {
  const { holdings, loading: holdingsLoading, error: holdingsError, retry: retryHoldings } = useHoldings();
  const { capitalGains, loading: gainsLoading, error: gainsError, retry: retryGains } = useCapitalGains();

  const loading = holdingsLoading || gainsLoading;
  const error = holdingsError || gainsError;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F1A] transition-colors duration-300 flex flex-col">
      <header className="bg-white dark:bg-[#131829] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 bg-koinx-blue rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">KoinX</h1>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">Tax Loss Harvesting</span>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <CurrencySelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
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
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Holdings</h2>
                  <HoldingsTable holdings={holdings} />
                </div>
              </>
            )}
          </HarvestingProvider>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131829] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          KoinX — Tax Loss Harvesting Tool
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AppContent />
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
