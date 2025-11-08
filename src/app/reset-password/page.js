'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import AuthLayout from '@/components/AuthLayout';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError('No reset token found. Please request a new password reset.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Set a New Password"
      description="Create a new, strong password for your account."
    >
      {message ? (
        <div className="text-center">
          <p className="text-green-600">{message}</p>
          <Link href="/login" className="mt-4 inline-block text-purple-600 hover:text-purple-700 font-medium">
            Proceed to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="password"
            label="New Password"
            type="password"
            required
            placeholder="••••••"
            icon="fas fa-lock"
            onStateChange={setPassword}
          />
          <Input
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            required
            placeholder="••••••"
            icon="fas fa-lock"
            onStateChange={setConfirmPassword}
          />
          <Button type="submit" fullWidth disabled={loading || !token}>
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Resetting...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                Save New Password
              </>
            )}
          </Button>
          {error && <p className="text-red-500 text-sm mt-4">Error: {error}</p>}
        </form>
      )}
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header secondaryText="Remember your password?" ctaText="Login" ctaLink="/login" />
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}