'use client';

import LiveData from './LiveData';
import WhaleWatch from './WhaleWatch';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    router.push('/login'); // Redirect to the login page
  };

  return (
    <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
      <div className="col-span-full flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold text-white">🐋 Whale Trade Dashboard</h1>
        <div className="flex space-x-4">
          <a
            href="https://t.me/Instant7_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            Access Telegram Bot
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-2"
      >
        <LiveData />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <WhaleWatch />
      </motion.div>
      {/* your other components, logout, etc stay unchanged */}
    </main>
  );
}
