'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header secondaryText="¿No tienes cuenta?" ctaText="Registrarse" ctaLink="/register" />
      <main className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl">
          <Card>
            <div className="grid md:grid-cols-2">
              <div className="gradient-bg p-12 text-white relative overflow-hidden hidden md:block">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 h-full flex flex-col justify-center slide-in-left">
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                      <i className="fas fa-broadcast-tower text-3xl"></i>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">¡Bienvenido de nuevo!</h2>
                    <p className="text-white/90 mb-6">
                      Ingresa a tu cuenta para continuar transmitiendo y conectando con tu audiencia.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-sm"></i>
                      </div>
                      <span className="text-sm">Transmisiones en vivo de alta calidad</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-sm"></i>
                      </div>
                      <span className="text-sm">Interacción en tiempo real</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-sm"></i>
                      </div>
                      <span className="text-sm">Analíticas detalladas</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="flex items-center gap-4">
                      <Image src="https://picsum.photos/seed/user1/40/40" alt="User" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white/50" />
                      <Image src="https://picsum.photos/seed/user2/40/40" alt="User" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white/50 -ml-4" />
                      <Image src="https://picsum.photos/seed/user3/40/40" alt="User" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white/50 -ml-4" />
                      <div className="ml-2">
                        <p className="text-sm font-semibold">+50K streamers</p>
                        <p className="text-xs text-white/70">Conectados ahora</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-12 slide-in-right">
                <div className="max-w-sm mx-auto">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 md:hidden">
                      <i className="fab fa-tiktok text-2xl tiktok-gradient"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h1>
                    <p className="text-gray-600 text-sm">Ingresa tus credenciales para acceder</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors social-btn">
                      <i className="fab fa-google text-red-500"></i>
                      <span className="text-sm font-medium text-gray-700">Continuar con Google</span>
                    </button>
                    <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors social-btn">
                      <i className="fab fa-apple text-gray-800"></i>
                      <span className="text-sm font-medium text-gray-700">Continuar con Apple</span>
                    </button>
                  </div>
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">O continúa con email</span>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input id="email" label="Email o Usuario" type="text" required placeholder="usuario@ejemplo.com" icon="fas fa-envelope" onStateChange={setEmail} />
                    <Input id="password" label="Contraseña" type="password" required placeholder="••••••" icon="fas fa-lock" onStateChange={setPassword} />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input type="checkbox" id="remember" name="remember" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                          Recordarme
                        </label>
                      </div>
                      <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <Button type="submit" fullWidth>
                      <i className="fas fa-sign-in-alt"></i>
                      Iniciar Sesión
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
