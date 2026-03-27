Act as a senior full-stack developer. Build a mobile-first Progressive Web App (PWA) for shared expense tracking.

Constraints & Environment:

Target devices: iOS Safari. Include a manifest.json for "Add to Home Screen" functionality.

Cost constraint: Zero operating cost. Use free-tier services exclusively.

Tech Stack: React, Tailwind CSS, Supabase (Free Tier) or Firebase (Spark Plan) for the database, and Vercel or Netlify for deployment.

Core Features:

Authentication: Implement a single-PIN entry screen to restrict access. Omit complex OAuth or individual user logins.

Data Entry Form: Build a form requiring: Amount (numeric), Spender (Toggle/Radio: User A / User B), Scenario (Text input or Dropdown), and Date.

Data Sync: Configure the database to sync expense records across multiple devices immediately.

Analytics: Integrate a lightweight charting library (e.g., Recharts) to output visual summaries of monthly spending categorized by scenario and spender.

Budget Alert: Set a configurable monthly budget variable. Trigger a prominent visual warning on the dashboard interface when cumulative monthly expenses exceed this limit.

Output Requirements:

Output the complete project directory structure.

Generate all frontend code, database schema initialization scripts, and PWA configuration files.

Write explicit terminal commands and step-by-step deployment instructions for the selected free hosting platform.