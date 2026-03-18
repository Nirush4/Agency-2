'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '@/types/register';
import z from 'zod';
import { createClient } from '@/service/api/subabaseClient';
import { useState, useRef, useEffect, JSX } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

type FormData = z.infer<typeof schema>;

const DEFAULT_AVATAR =
  'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

export default function RegisterPage(): JSX.Element {
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (formError) {
      errorRef.current?.focus();
    }
  }, [formError]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setFormError(null);

    const loadingToast = toast.loading('Creating account...', {
      style: {
        background: '#EEF5DB',
        color: '#053225',
        border: '1px solid #F15A20',
      },
    });

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message, { id: loadingToast });
        return;
      }

      const userId = authData.user?.id;
      if (!userId) throw new Error('User creation failed');

      const { error: profileError } = await supabase.from('users').insert({
        id: userId,
        username: data.name,
        email: data.email,
        profile_image: data.avatar_url || DEFAULT_AVATAR,
      });

      if (profileError) {
        toast.error(profileError.message, { id: loadingToast });
        return;
      }

      toast.success('Account created! Please check your email.', {
        id: loadingToast,
      });

      setTimeout(() => router.push('/login'), 1000);
    } catch (err) {
      toast.error((err as Error).message || 'Something went wrong', {
        id: loadingToast,
      });
    }
  };

  return (
    <div
      className='relative flex items-center justify-center min-h-screen px-4 sm:px-6'
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src='https://images.unsplash.com/photo-1558467523-46113f1fcf72?q=80&w=2531&auto=format&fit=crop'
          alt=''
          aria-hidden='true'
          fill
          className='object-cover opacity-80 scale-125 blur-xs'
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl p-8 sm:p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200'
      >
        <div className='mb-8 text-center'>
          <h1 className='text-h3 sm:text-h1 font-heading font-extrabold text-text'>
            Create Account
          </h1>
          <p className='mt-2 text-body font-body'>
            Join and share your delicious recipes 🍽️
          </p>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block mb-2 text-body font-body font-medium'
          >
            Full name
          </label>
          <input
            id='name'
            {...register('name')}
            autoComplete='name'
            placeholder='John Doe'
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className='w-full px-4 py-3 text-body font-body border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]'
          />
          {errors.name && (
            <p id='name-error' className='mt-1 text-sm text-red-500'>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='avatar'
            className='block mb-2 text-body font-body font-medium'
          >
            Profile picture URL
          </label>
          <input
            id='avatar'
            {...register('avatar_url')}
            autoComplete='url'
            placeholder='https://example.com/avatar.jpg'
            className='w-full px-4 py-3 text-body font-body border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]'
          />
          {errors.avatar_url && (
            <p className='text-sm text-red-500'>{errors.avatar_url.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block mb-2 text-body font-body font-medium'
          >
            Email
          </label>
          <input
            id='email'
            {...register('email')}
            autoComplete='email'
            placeholder='johndoe@example.com'
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className='w-full px-4 py-3 text-body font-body border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]'
          />
          {errors.email && (
            <p id='email-error' className='text-sm text-red-500'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='mb-6 relative'>
          <label
            htmlFor='password'
            className='block mb-2 text-body font-body font-medium'
          >
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              autoComplete='new-password'
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              placeholder='••••••••'
              className='w-full px-4 py-3 text-body font-body border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] pr-12'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className='h-5 w-5 cursor-pointer' />
              ) : (
                <Eye className='h-5 w-5 cursor-pointer' />
              )}
            </button>
          </div>
          {errors.password && (
            <p id='password-error' className='text-sm text-red-500 mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>

        {formError && (
          <div
            ref={errorRef}
            role='alert'
            aria-live='assertive'
            tabIndex={-1}
            className='mb-4 p-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-red-400'
            style={{
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              borderColor: '#FCA5A5',
            }}
          >
            {formError}
          </div>
        )}

        <button
          type='submit'
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className='w-full py-3 sm:py-4 cursor-pointer text-white font-semibold rounded-xl shadow-lg transition transform hover:scale-105 focus:ring-2 focus:ring-[var(--color-secondary)]'
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          {isSubmitting ? 'Creating account…' : 'Sign up'}
        </button>

        <div className='sr-only' aria-live='polite'>
          {isSubmitting ? 'Submitting form' : ''}
        </div>

        <p className='mt-6 text-center text-body font-body'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='font-semibold'
            style={{ color: 'var(--color-secondary)' }}
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
