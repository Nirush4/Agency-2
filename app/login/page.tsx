'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../service/api/subabaseClient';
import Image from 'next/image';
import { toast } from 'sonner';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading('Logging in...', {
      style: { backgroundColor: 'var(--color-secondary)', color: 'white' },
    });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.dismiss(toastId);
        toast.error(error.message, {
          style: { backgroundColor: '#FEE2E2', color: '#991B1B' },
        });
        setLoading(false);
        return;
      }

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

      toast.dismiss(toastId);
      toast.success('Logged in successfully!', {
        style: { backgroundColor: 'var(--color-secondary)', color: 'white' },
      });

      router.push('/');
    } catch (err) {
      toast.dismiss(toastId);
      toast.error((err as Error).message || 'Something went wrong', {
        style: { backgroundColor: '#FEE2E2', color: '#991B1B' },
      });
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
          src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop'
          alt=''
          aria-hidden='true'
          fill
          className='w-full h-full object-cover opacity-80 scale-125 blur-xs'
          priority
        />
      </div>

      <form
        onSubmit={handleLogin}
        className='relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl p-8 sm:p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 transition-opacity duration-300'
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
          <label
            htmlFor='email'
            className='block mb-2 text-body font-body font-medium'
          >
            Email address
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
            aria-label='Email address'
            aria-required='true'
            className='w-full px-4 py-3 border rounded-xl text-body font-body focus:outline-none focus:ring-2 focus:ring-(--color-secondary) shadow-sm transition'
            placeholder='you@example.com'
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block mb-2 text-body font-body font-medium'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='current-password'
            aria-label='Password'
            aria-required='true'
            className='w-full px-4 py-3 text-body font-body border rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-secondary) shadow-sm transition'
            placeholder='••••••••'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          aria-busy={loading}
          className='flex items-center cursor-pointer justify-center w-full py-3 sm:py-4 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--color-secondary)'
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>

        <p className='mt-6 text-center text-body font-body'>
          Don’t have an account?{' '}
          <Link
            href='/register'
            className='font-semibold focus:outline-none focus:underline'
            style={{ color: 'var(--color-secondary)' }}
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
