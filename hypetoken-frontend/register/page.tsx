'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const msg = await res.text();
        setError(msg);
      }
    } catch (err) {
      setError('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Register'}
        </button>

        {error && <p className="text-red-600 text-center text-sm">{error}</p>}
      </form>
    </div>
  );
}
