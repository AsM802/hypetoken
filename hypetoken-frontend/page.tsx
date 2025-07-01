'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Track HYPE Token Trades In Real-Time</h1>
      <p>
        Get instant notifications for large HYPE token trades via Telegram.
        Never miss a significant market movement again.
      </p>

      <div style={{ marginTop: '30px' }}>
        <Link href="/register">
          <button className="button">Start Tracking Now</button>
        </Link>
        <Link href="/dashboard">
          <button className="button">View Demo</button>
        </Link>
      </div>

      <div className="card">
        <h2>Features</h2>
        <ul>
          <li>🔄 Real-Time Tracking</li>
          <li>📢 Telegram Alerts</li>
          <li>📊 Advanced Analytics</li>
        </ul>
      </div>
    </div>
  );
}
