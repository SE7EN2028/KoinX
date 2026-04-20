# KoinX - Tax Loss Harvesting Tool                                                                                                                                                                                 
                                                            
  A responsive Tax Loss Harvesting interface built with React + TypeScript that helps users visualize potential tax savings by selecting crypto holdings to harvest.                                                 
   
  ## Live Demo                                                                                                                                                                                                       
                                                            
  [Deployed Link]](https://koin-x-theta-five.vercel.app/)                                                                                                                                                                    
   
  ## Tech Stack                                                                                                                                                                                                      
                                                            
  - **React 19** + **TypeScript** (Vite)
  - **Tailwind CSS v4** for styling
  - **Context API** for state management (HarvestingContext, ThemeContext, CurrencyContext, WatchlistContext)                                                                                                        
  - **Mock APIs** via Promises with simulated 500-800ms delay                                                                                                                                                        
                                                                                                                                                                                                                     
  ## Setup                                                                                                                                                                                                           
                                                                                                                                                                                                                     
  ```bash                                                   
  git clone https://github.com/SE7EN2028/KoinX.git
  cd KoinX                                                                                                                                                                                                           
  npm install
  npm run dev                                                                                                                                                                                                        
  ```                                                       

  Open `http://localhost:5173` in your browser.                                                                                                                                                                      
   
  ## Build                                                                                                                                                                                                           
                                                            
  ```bash
  npm run build
  npm run preview
  ```

  ## Screenshots

  ### Desktop - Dark Mode
  <img width="1512" height="867" alt="Screenshot 2026-04-20 at 11 53 28 PM" src="https://github.com/user-attachments/assets/09d40f66-88bf-41ae-b168-c5aea512b8ad" />


  ### Desktop - Holdings Table                                                                                                                                                                                       
  <img width="1512" height="868" alt="Screenshot 2026-04-20 at 11 54 51 PM" src="https://github.com/user-attachments/assets/38a30be4-cf9e-4bec-9180-4caabe2a01a2" />

                                                                                                                                                                                                                     
  ## Features                                               

  ### Core

  - **Pre-Harvesting Card** — Displays STCG/LTCG profits, losses, net capital gains, and realised capital gains from the Capital Gains API                                                                           
  - **After-Harvesting Card** — Mirrors pre-harvesting initially, updates in real-time as holdings are selected/deselected
  - **Holdings Table** — Full table with checkbox selection (individual + select all), Short Term / Long Term / All tab filters, View All / View Less toggle                                                         
  - **Savings Line** — "You're going to save X" shown only when post-harvesting gains < pre-harvesting gains                                                                                                         
  - **How It Works** — Popover with usage instructions and pro tip
                                                                                                                                                                                                                     
  ### Extra Features                                        

  - **Dark / Light Mode** — Toggle with localStorage persistence, system preference detection                                                                                                                        
  - **Currency Selector** — 12 currencies (INR, USD, EUR, GBP, JPY, CNY, KRW, RUB, AUD, CAD, SGD, AED) with live conversion
  - **Animated Counters** — Numbers animate smoothly with eased transitions when values change                                                                                                                       
  - **Toast Notifications** — Pop-up alerts when savings thresholds are crossed (1K, 10K, 25K, 50K)
  - **Watchlist** — Star/bookmark holdings, filter by watchlist, persisted to localStorage                                                                                                                           
  - **Export CSV / PDF** — Download harvesting report as CSV or styled print-friendly PDF                                                                                                                            
  - **Hover Tooltips** — Compact numbers (K/M/B) with styled tooltips showing full values on hover
  - **Loading Skeletons** — Shimmer placeholders while APIs load                                                                                                                                                     
  - **Error State** — Friendly error message with retry button on API failure
                                                                                                                                                                                                                     
  ### Responsiveness                                        

  - **Desktop** — Cards side-by-side, full table
  - **Mobile (<768px)** — Cards stacked, table horizontally scrollable, responsive header
                                                                                                                                                                                                                     
  ## Folder Structure
                                                                                                                                                                                                                     
  ```                                                       
  src/
  ├── api/              # Mock API functions (holdings, capitalGains)
  ├── components/
  │   ├── PreHarvestingCard.tsx
  │   ├── AfterHarvestingCard.tsx
  │   ├── HoldingsTable.tsx                                                                                                                                                                                          
  │   ├── HoldingRow.tsx
  │   ├── ImportantNotes.tsx                                                                                                                                                                                         
  │   ├── HowItWorks.tsx                                    
  │   ├── ThemeToggle.tsx
  │   ├── CurrencySelector.tsx                                                                                                                                                                                       
  │   ├── ExportButtons.tsx
  │   └── ui/           # Reusable: Checkbox, Card, Skeleton, ErrorState, Toast, Tooltip, AnimatedCurrency                                                                                                           
  ├── context/          # HarvestingContext, ThemeContext, CurrencyContext, WatchlistContext                                                                                                                         
  ├── hooks/            # useHoldings, useCapitalGains, useAnimatedNumber
  ├── types/            # TS interfaces for Holding, CapitalGains                                                                                                                                                    
  ├── utils/            # formatters (currency, crypto), calculations, export                                                                                                                                        
  └── App.tsx
  ```                                                                                                                                                                                                                
                                                            
  ## Assumptions

  - Mock APIs return after 500-800ms delay to simulate network latency
  - Savings calculation shows only the delta of realised gains (no actual tax % applied)
  - Very small holdings (< 1e-6) displayed as "~0"                                                                                                                                                                   
  - Exchange rates for currency conversion are mocked/approximate
  - Watchlist and theme preferences persist via localStorage                                                                                                                                                         
  - Duplicate coin entries (e.g. two USDC variants) are handled with unique IDs
