# Project Improvement Plan for HypeToken

This document outlines a plan for enhancing the existing "HypeToken" application by improving its robustness, adding key features, and adhering to best practices.

## I. Core Enhancements & Best Practices:

### 1. Consistent Configuration (`next.config.ts`)
*   **Issue:** Presence of both `next.config.js` and `next.config.ts` can lead to confusion.
*   **Improvement:** Standardize on `next.config.ts` for type safety and consistency. Remove `next.config.js`.
*   **Benefit:** Clearer configuration management, reduced potential for errors.

### 2. Centralized Constants/Configuration
*   **Issue:** "Magic numbers" (e.g., thresholds, intervals, history limits) are hardcoded within `enhanced_hype_monitor.mjs`.
*   **Improvement:** Extract these into a dedicated configuration file (e.g., `config/app.ts`) that can be imported and used across the application.
*   **Benefit:** Easier modification of parameters, improved readability and maintainability.

### 3. Robust Data Persistence (MongoDB Integration)
*   **Issue:** `enhanced_hype_monitor.mjs` currently uses flat JSON files for data persistence, which is not robust or scalable for production.
*   **Improvement:** Migrate `priceHistory`, `tradeHistory`, and `whaleAddresses` storage from JSON files to MongoDB. This will involve creating new Mongoose models for these data types.
*   **Benefit:** Data integrity, persistence across restarts, scalability, and easier querying for historical data.

### 4. Type Safety for Backend Logic (`enhanced_hype_monitor.mjs` to `.mts`)
*   **Issue:** `enhanced_hype_monitor.mjs` is a JavaScript file, lacking type checking benefits.
*   **Improvement:** Convert `enhanced_hype_monitor.mjs` to `enhanced_hype_monitor.mts` (TypeScript module) and add appropriate type definitions.
*   **Benefit:** Reduced bugs, improved code quality, better developer experience, and consistency with other TypeScript parts of the project.

### 5. Enhanced Error Handling & Logging
*   **Issue:** Basic console logging for errors.
*   **Improvement:** Implement a more structured logging approach (e.g., using a dedicated logging library like Winston or Pino) and consider integrating with an error monitoring service for production.
*   **Benefit:** Easier debugging, proactive issue detection, and better operational visibility.

## II. Feature Enhancements:

### 1. Enhanced Whale Tracking & Management
*   **Current State:** `getWhaleTrades` exists but requires manual configuration of whale addresses.
*   **Improvement:**
    *   **Dashboard UI for Whale Management:** Create a dedicated section in the dashboard where users can easily add, edit, and remove whale addresses to monitor. This UI would interact with new API endpoints (e.g., `/api/whales/manage`) that persist these addresses in MongoDB.
    *   **Display Whale Portfolio/History:** For monitored whales, display their HYPE balance, portfolio value (if available), and historical large trades.
*   **Benefit:** Empowers users to customize their whale monitoring, provides deeper insights into specific whale activity.

### 2. Comprehensive Historical Data Visualization
*   **Current State:** `priceHistory` and `tradeHistory` are collected but have limited display options.
*   **Improvement:**
    *   **Interactive Price Charts:** Enhance `PriceHistoryChartCard` to allow users to select various timeframes (e.g., 1H, 4H, 1D, 1W) and display more detailed OHLC (Open, High, Low, Close) data.
    *   **Detailed Trade History Table:** Create a dedicated dashboard page or component to display the full historical trade data from MongoDB, with filtering, sorting, and pagination capabilities.
*   **Benefit:** Provides users with powerful tools for market analysis and historical review.

### 3. Customizable Alert System
*   **Current State:** Alert thresholds (e.g., for large trades) are hardcoded.
*   **Improvement:** Allow users to define and manage custom alert thresholds and conditions (e.g., price change percentage, specific RSI levels, volume spikes) through the dashboard UI. These preferences would be stored per user in the database.
*   **Benefit:** Personalized and more relevant alerts for users.

### 4. User Profiles & Preferences
*   **Current State:** Basic login/register functionality.
*   **Improvement:** Extend user authentication to include user profiles where personalized settings (like custom alerts, monitored whale addresses) can be stored and retrieved.
*   **Benefit:** Tailored user experience, persistent settings.

### 5. Advanced Telegram Bot Interaction
*   **Current State:** Telegram bot sends basic alerts.
*   **Improvement:**
    *   **Interactive Commands:** Add more commands to the Telegram bot (e.g., `/price` for current price, `/status` for market summary, `/mywhales` to list monitored whales).
    *   **Personalized Subscriptions:** Allow users to subscribe to specific alert types or monitor specific whales directly via the bot.
*   **Benefit:** More powerful and convenient access to information and control.

## III. Project Structure & Documentation:

### 1. Refined Folder Structure
*   **Improvement:** As MongoDB integration progresses, the `data/` directory for JSON files might become obsolete. Ensure the folder structure remains logical and reflects the application's architecture.
*   **Benefit:** Improved code organization and clarity.

### 2. Comprehensive `README.md`
*   **Improvement:** Update the `README.md` with detailed setup instructions, environment variable requirements, how to run the project, a clear overview of API endpoints, and a description of all implemented features.
*   **Benefit:** Easier onboarding for new contributors and better overall project understanding.

---

**Proposed Next Step (Prioritized):**

**1. Robust Data Persistence for `enhanced_hype_monitor.mjs` (MongoDB Integration):**
This involves:
    *   Creating new Mongoose models for `PriceHistory` and `TradeHistory`.
    *   Modifying `enhanced_hype_monitor.mjs` to save and load data from these MongoDB collections instead of JSON files.
