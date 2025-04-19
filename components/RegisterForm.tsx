"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/libs/supabase';
import Cookies from 'js-cookie';

const RegisterForm = () => {
  const [providers, setProviders] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
    insuranceProvider: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('supabase-auth-token');
    if (token) {
      window.location.href = '/';
    }

    // Fetch providers
    const fetchProviders = async () => {
      try {
        const res = await fetch('/api/providers');
        const data = await res.json();
        setProviders(data.providers || []);
      } catch (err) {
        console.error('Failed to load providers', err);
      }
    };

    fetchProviders();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      const user = data.user;
      if (user) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: user.id,
              name: form.name,
              birthday: form.birthday,
              insurance_provider: form.insuranceProvider,
            },
          ]);

        if (insertError) {
          setError(insertError.message);
          return;
        }
      }

      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      Cookies.set('supabase-auth-token', loginData.session?.access_token || '', { expires: 7 });
      window.location.href = '/';

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Name:</label>
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <label>Birthday:</label>
      <input
        type="date"
        value={form.birthday}
        onChange={(e) => setForm({ ...form, birthday: e.target.value })}
        required
      />

      <label>Insurance Provider:</label>
      <select
        value={form.insuranceProvider}
        onChange={(e) => setForm({ ...form, insuranceProvider: e.target.value })}
        required
      >
        <option value="">-- Select a provider --</option>
        {providers.map((provider) => (
          <option key={provider} value={provider}>{provider}</option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
