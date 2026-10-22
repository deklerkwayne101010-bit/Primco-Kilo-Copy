import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple auth check - for basic protection
    if (email === 'admin@primeco.co.za' && password === 'primeco2024') {
      localStorage.setItem('admin_auth', 'true');
      onLogin();
      setLoading(false);
      return;
    }

    if (supabase) {
      try {
        const { data, error: dbError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (data) {
          // Try both encodings
          if (data.password_hash === btoa(password) || 
              data.password_hash === Buffer.from(password).toString('base64') ||
              data.password_hash === password) {
            localStorage.setItem('admin_auth', 'true');
            onLogin();
            setLoading(false);
            return;
          }
        }
        setError('Invalid credentials');
      } catch (err) {
        console.error(err);
        setError('Invalid credentials');
      }
    } else {
      setError('Supabase not configured');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--ink)] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Primeco Admin</h1>
          <p className="text-[var(--muted)]">Sign in to access the dashboard</p>
        </div>

        <div className="bg-[#0b0e12] border border-[var(--line)] rounded-[var(--radius-xl)] p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--silver)] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#080b0e] border border-[var(--line)] rounded-lg text-white focus:outline-none focus:border-[var(--blue)]"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[var(--grad-brand)] text-white rounded-lg font-medium hover:shadow-[var(--glow-md)] disabled:opacity-50 transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <a href="#/" className="text-sm text-[var(--blue)] hover:underline">Back to Site</a>
        </div>
      </div>
    </div>
  );
};
