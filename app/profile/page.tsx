"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/libs/supabase';
import Cookies from "js-cookie";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<string[]>([]);
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    birthday: '',
    insurance_provider: '',
    international: false,
    income_level: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfileAndProviders = async () => {
      try {
        setLoading(true);

        const [{ data: userData }, providerRes] = await Promise.all([
          supabase.auth.getUser(Cookies.get("supabase-auth-token")),
          fetch('/api/providers').then((res) => res.json()),
        ]);

        console.log("providerRes", providerRes);

        const providerNames = providerRes.data.map((provider)=>provider.name)

        const user = userData.user;
        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setProfile({
            name: data.name || '',
            location: data.location || '',
            birthday: data.birthday || '',
            insurance_provider: data.insurance_provider || '',
            international: data.international || false,
            income_level: data.income_level?.toString() || '',
          });
        }

        setProviders(providerNames|| []);
        
      } catch (error) {
        console.log('Error Loading Profile:',error)
        
      }finally{
        setLoading(false);
      }
    };

    fetchProfileAndProviders();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        ...profile,
        income_level: parseFloat(profile.income_level),
      });

    setMessage(error ? 'Failed to update profile' : 'Profile updated successfully!');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>

      <label>
        Name:
        <input name="name" value={profile.name} onChange={handleChange} required />
      </label>

      <label>
        Location:
        <input name="location" value={profile.location} onChange={handleChange} required />
      </label>

      <label>
        Birthday:
        <input name="birthday" type="date" value={profile.birthday} onChange={handleChange} required />
      </label>

      <label>
        Insurance Provider:
        <select
          name="insurance_provider"
          value={profile.insurance_provider}
          onChange={handleChange}
          required
        >
          <option value="">-- Select a provider --</option>
          {providers.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </label>

      <label>
        International Student:
        <input
          type="checkbox"
          name="international"
          checked={profile.international}
          onChange={handleChange}
        />
      </label>

      <label>
        Income Level:
        <input
          name="income_level"
          type="number"
          step="0.01"
          value={profile.income_level}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default ProfilePage;
