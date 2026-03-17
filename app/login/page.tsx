'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../service/api/subabaseClient';
import Image from 'next/image';

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
    <div
      className='relative flex items-center justify-center min-h-screen px-4 sm:px-6'
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Food background'
          className='w-full h-full object-cover opacity-80 blur-xs'
          fill
          priority
        />
      </div>

      <form
        onSubmit={handleLogin}
        className='relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-200 transition-opacity duration-300'
        style={{ opacity: showLoader ? 0.4 : 1 }}
      >
        <div className='mb-8 text-center'>
          <h1 className='text-h3 sm:text-h1 font-heading font-extrabold text-text'>
            Welcome Back
          </h1>
          <p className='mt-2 text-sm sm:text-base'>
            Sign in to access your delicious recipes
          </p>
        </div>

        <div className='mb-5'>
          <label className='block mb-2 text-body font-body font-medium '>
            Email address
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='you@example.com'
            className='w-full px-4 py-3  border rounded-xl  text-body font-body focus:outline-none shadow-sm transition'
          />
        </div>

        <div className='mb-6'>
          <label className='block mb-2  text-body font-body font-medium'>
            Password
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='••••••••'
            className='w-full px-4 py-3  text-body font-body border rounded-xl focus:outline-none shadow-sm transition'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='flex items-center cursor-pointer justify-center w-full py-3 sm:py-4 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg transition transform hover:scale-105'
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>

        <p
          className='mt-6 text-center  text-body font-body'
          style={{ color: 'var(--color-text)' }}
        >
          Don’t have an account?{' '}
          <Link
            href='/register'
            className='font-semibold'
            style={{ color: 'var(--color-secondary)' }}
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
