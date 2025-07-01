# HypeToken Trading Dashboard

HypeToken is a comprehensive web application designed to provide real-time tracking and analysis of the Hype token on the Hyperliquid decentralized exchange. It features a user-friendly dashboard, whale trade monitoring, and a companion Telegram bot for on-the-go updates.

## ✨ Features

- **Real-time Price Tracking:** View the latest price of the Hype token.
- **Historical Data:** Interactive charts displaying historical price data.
- **Whale Watch:** Monitor large trades (whale trades) to gain market insights.
- **User Authentication:** Secure user registration and login functionality.
- **Telegram Bot:** Get notifications and interact with the service via a Telegram bot.
- **Responsive Design:** A clean and modern UI built with Tailwind CSS that works on all devices.

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Recharts for charting.
- **Backend:** Next.js API Routes, Node.js, MongoDB.
- **Authentication:** JSON Web Tokens (JWT), bcrypt for password hashing.
- **Libraries:**
    - `@nktkas/hyperliquid` & `hyperliquid` for interacting with the Hyperliquid exchange API.
    - `mongoose` as the ODM for MongoDB.
    - `axios` & `node-fetch` for making HTTP requests.
    - `node-telegram-bot-api` for the Telegram bot.

## 📂 Project Structure

The project is organized into several key directories:

```
/
├── app/                # Next.js 13+ app directory (frontend pages and components)
├── components/         # Shared React components
├── data/               # JSON data files (e.g., price history)
├── hype-telegram-bot/  # Code for the Telegram bot
├── hypetoken-backend/  # Backend services and API logic
├── lib/                # Helper functions, API clients, and database models
├── public/             # Static assets
└── ...
```

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AsM802/hypetoken.git
    cd hypetoken
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following variables. Replace the placeholder values with your actual credentials.

    ```env
    # MongoDB
    MONGODB_URI=your_mongodb_connection_string

    # JWT
    JWT_SECRET=your_jwt_secret

    # Telegram
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token

    # Hyperliquid API (if needed)
    HYPERLIQUID_API_KEY=your_hyperliquid_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 License

This project is licensed under the ISC License. See the `LICENSE` file for details.
