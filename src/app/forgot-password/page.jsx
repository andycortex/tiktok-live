'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import AuthLayout from '@/components/AuthLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
    <div className="bg-gray-50 min-h-screen">
      <Header secondaryText="Remember your password?" ctaText="Login" ctaLink="/login" />
      <AuthLayout
        title="Forgot Your Password?"
        description="Enter your email and we'll send you a link to get back into your account."
      >
        {message ? (
          <div className="text-center">
            <p className="text-green-600">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              id="email" 
              label="Email" 
              type="email" 
              required 
              placeholder="you@example.com" 
              icon="fas fa-envelope" 
              value={email}
              onStateChange={setEmail} 
            />
            
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Sending Link...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Send Reset Link
                </>
              )}
            </Button>
            {error && <p className="text-red-500 text-sm mt-4">Error: {error}</p>}
          </form>
        )}
      </AuthLayout>
    </div>
  );
}