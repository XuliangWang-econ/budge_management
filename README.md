# Shared Expense Tracker PWA

A mobile-first Progressive Web App for tracking shared expenses between two users (User A and User B).

## Features

- 🔐 **PIN Authentication** - Simple 4-digit PIN to restrict access
- 📝 **Expense Entry** - Quick form to add expenses with amount, spender, scenario, and date
- 📊 **Analytics Dashboard** - Visual charts showing spending by scenario, spender, and monthly trends
- 💰 **Budget Alerts** - Configurable monthly budget with visual warnings when exceeded
- 🔄 **Real-time Sync** - Expenses sync automatically across multiple devices via Supabase
- 📱 **PWA Ready** - Install on iOS Safari via "Add to Home Screen"

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (Free Tier)
- **Charts**: Recharts
- **Deployment**: Vercel or Netlify (Free Tier)

## Project Structure

```
记账/
├── public/
│   ├── vite.svg
│   ├── apple-touch-icon.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── masked-icon.svg
├── src/
│   ├── components/
│   │   ├── PinScreen.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── BudgetAlert.jsx
│   │   ├── SpendingByScenario.jsx
│   │   ├── SpendingBySpender.jsx
│   │   └── MonthlyTrend.jsx
│   ├── hooks/
│   │   ├── usePinAuth.js
│   │   ├── useExpenses.js
│   │   └── useBudget.js
│   ├── lib/
│   │   ├── supabase.js
│   │   └── supabaseClient.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase-schema.sql
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor and run the contents of `supabase-schema.sql`
4. Go to Settings → API and copy:
   - Project URL
   - anon/public key

### 3. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_DEFAULT_PIN=1234
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

5. Redeploy for changes to take effect

### Option 2: Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. Set environment variables:
   ```bash
   netlify env:set VITE_SUPABASE_URL your-url
   netlify env:set VITE_SUPABASE_ANON_KEY your-key
   ```

### Option 3: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to any static hosting service

## iOS Safari Installation

1. Open the app in Safari on iOS
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right corner

The app will now appear on your home screen and work like a native app.

## Usage

### Default PIN
- Default PIN: `1234` (or set via `VITE_DEFAULT_PIN`)
- You can change the PIN from the login screen

### Adding Expenses
1. Enter the amount
2. Select who paid (User A or User B)
3. Enter or select a scenario (e.g., Grocery, Dinner)
4. Choose the date
5. Tap "Save Expense"

### Budget Management
1. The budget alert shows current month's spending
2. Tap the gear icon (⚙) to edit the monthly budget
3. Visual warnings appear at 80% and when exceeded

## Database Schema

The app uses the following Supabase tables:

### expenses
- `id` (UUID, primary key)
- `amount` (DECIMAL)
- `spender` (VARCHAR: 'User A' or 'User B')
- `scenario` (VARCHAR)
- `expense_date` (DATE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### settings
- `id` (UUID, primary key)
- `key` (VARCHAR, unique)
- `value` (TEXT)
- `updated_at` (TIMESTAMP)

## License

MIT
