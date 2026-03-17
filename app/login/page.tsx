'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../service/api/subabaseClient';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error.message);
        setLoading(false);
        return;
      }

      setShowLoader(true);

      if (data.user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          localStorage.setItem('username', profile.username ?? '');
          localStorage.setItem(
            'avatar_url',
            profile.avatar_url ??
              'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
          );
        }
      }

      setShowLoader(false);
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-rose-50 px-4'>
      <div className='absolute inset-0 overflow-hidden'>
        <img
          src='/images/food-background.jpg'
          alt='Food background'
          className='w-full h-full object-cover opacity-20 blur-sm'
        />
      </div>

      <form
        onSubmit={handleLogin}
        className='relative z-10 w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl backdrop-blur-sm border border-gray-200 transition-opacity duration-300'
        style={{ opacity: showLoader ? 0.4 : 1 }}
      >
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-extrabold text-[#F15A20] tracking-wide'>
            Welcome Back
          </h1>
          <p className='mt-2 text-sm text-gray-500'>
            Sign in to access your delicious recipes
          </p>
        </div>

        <div className='mb-5'>
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            Email address
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='you@example.com'
            className='w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 shadow-sm transition'
          />
        </div>

        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='••••••••'
            className='w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 shadow-sm transition'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='flex items-center justify-center w-full py-3 text-white text-sm font-semibold bg-[#F15A20] rounded-xl hover:bg-amber-600 shadow-lg transition'
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>

        <p className='mt-6 text-center text-gray-600 text-sm'>
          Don’t have an account?{' '}
          <Link
            href='/register'
            className='font-semibold text-[#F15A20] hover:text-amber-600'
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
