'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const TapTapPage = () => {
  const navRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const mobileMenuBtn = mobileMenuBtnRef.current;
    const mobileMenu = mobileMenuRef.current;
    const nav = navRef.current;

    // Mobile menu toggle
    const handleMenuClick = () => {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    };
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', handleMenuClick);
    }

    // Smooth scroll for anchor links
    const handleAnchorClick = function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', handleAnchorClick);
    });

    // Add scroll effect to navbar
    const handleScroll = () => {
        if (!nav) return;
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
        if (mobileMenuBtn) {
            mobileMenuBtn.removeEventListener('click', handleMenuClick);
        }
        anchors.forEach(anchor => {
            anchor.removeEventListener('click', handleAnchorClick);
        });
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav ref={navRef} className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-orange-500">TapTap</span>
                    <svg className="w-10 h-10 text-blue-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4"></path>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                        <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
                    </svg>
                </div>
                
                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-orange-500 font-medium hover:text-orange-600 transition">Inicio</a>
                    <a href="#" className="text-gray-700 hover:text-orange-500 transition">Instrucciones</a>
                    <a href="#" className="text-gray-700 hover:text-orange-500 transition">Catálogo</a>
                    <a href="#" className="text-gray-700 hover:text-orange-500 transition">Panel Vendedor</a>
                    <a href="#" className="text-gray-700 hover:text-orange-500 transition">Portal Empresa</a>
                </div>
                
                {/* CTA Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <button className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
                        Mi cuenta
                    </button>
                    <button className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition">
                        Registrarse
                    </button>
                </div>
                
                {/* Mobile Menu Button */}
                <button ref={mobileMenuBtnRef} id="mobile-menu-btn" className="md:hidden p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        {/* Mobile Menu */}
        <div ref={mobileMenuRef} id="mobile-menu" className="hidden md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
                <a href="#" className="block text-orange-500 font-medium">Inicio</a>
                <a href="#" className="block text-gray-700">Instrucciones</a>
                <a href="#" className="block text-gray-700">Catálogo</a>
                <a href="#" className="block text-gray-700">Panel Vendedor</a>
                <a href="#" className="block text-gray-700">Portal Empresa</a>
                <div className="pt-4 space-y-2">
                    <button className="w-full px-6 py-2.5 bg-black text-white rounded-lg font-medium">Mi cuenta</button>
                    <button className="w-full px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium">Registrarse</button>
                </div>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                    <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                        Tu asistente de<br />
                        <span className="text-gray-900">Ventas 24/7</span>
                    </h1>
                    
                    <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                        TapTap escucha tus transmisiones en vivo en tiktok y responde automáticamente por WhatsApp. Cierra ventas mientras sigues haciendo lo que amas.
                    </p>
                    
                    <button className="px-8 py-4 bg-orange-500 text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-xl">
                        Comienza Gratis!
                    </button>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-8">
                        <div className="stat-card">
                            <div className="text-4xl lg:text-5xl font-black text-orange-500">150+</div>
                            <div className="text-sm text-gray-600 mt-2">Tiendas registrados</div>
                        </div>
                        <div className="stat-card" style={{animationDelay: '0.2s'}}>
                            <div className="text-4xl lg:text-5xl font-black text-orange-500">50+</div>
                            <div className="text-sm text-gray-600 mt-2">Vendedores registrados</div>
                        </div>
                        <div className="stat-card" style={{animationDelay: '0.4s'}}>
                            <div className="text-4xl lg:text-5xl font-black text-orange-500">&lt;</div>
                            <div className="text-4xl lg:text-5xl font-black text-orange-500">10seg</div>
                            <div className="text-sm text-gray-600 mt-2">Tiempo de respuesta</div>
                        </div>
                    </div>
                </div>
                
                {/* Right Content - Phone Mockup */}
                <div className="relative">
                    <div className="phone-mockup relative">
                        {/* Activity Card */}
                        <div className="absolute top-0 left-0 bg-white rounded-2xl shadow-2xl p-6 max-w-xs z-10">
                            <h3 className="text-xl font-bold mb-4">Actividad del Agente IA</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full pulse-animation"></span>
                                    <span>Escuchando Live 🔊</span>
                                </li>
                                <li>• Mensajes recibidos: <span className="font-bold">48</span></li>
                                <li>• Respuestas enviadas: <span className="font-bold">47</span></li>
                                <li>• Ventas confirmadas: <span className="font-bold">12 ✅</span></li>
                            </ul>
                            <div className="mt-4 px-4 py-2 bg-black text-white text-center rounded-full text-sm font-medium">
                                En tiempo real
                            </div>
                        </div>
                        
                        {/* Results Panel */}
                        <div className="absolute top-8 right-0 bg-white rounded-2xl shadow-2xl p-6 max-w-xs z-20">
                            <h3 className="text-xl font-bold mb-3">Panel de resultados</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• Ventas hoy: <span className="font-bold">Bs. 1,240</span></li>
                                <li>• Nuevos clientes: <span className="font-bold">18</span></li>
                                <li>• Productos más vendidos: <span className="text-xs">"Set cosmético", "Auriculares Pro"</span></li>
                            </ul>
                        </div>
                        
                        {/* Conversations Card */}
                        <div className="absolute bottom-0 right-0 bg-white rounded-2xl shadow-2xl p-6 max-w-sm z-10">
                            <h3 className="text-xl font-bold mb-3">Conversaciones activas!</h3>
                            <ul className="space-y-2 text-sm">
                                <li>• 💬 "¿Todavía tienes disponible el producto azul?"</li>
                                <li>• 💬 TapTap: "Sí, te envío el qr de pago por WhatsApp 📱"</li>
                                <li>• 💬 "Listo, acabo de pagar."</li>
                                <li>• 💬 TapTap: "Perfecto, ya registré tu pedido"</li>
                            </ul>
                            <div className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold transform -rotate-2">
                                ¡IA respondiendo automáticamente
                            </div>
                        </div>
                        
                        {/* Phone Image Placeholder */}
                        <div className="relative mx-auto w-64 h-[500px] bg-gray-900 rounded-[3rem] shadow-2xl p-3 mt-32">
                            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                                <div className="bg-gray-100 h-full flex items-center justify-center">
                                    <Image src="/vercel.svg" alt="Phone Interface" width={250} height={500} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">Impulsados por:</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
                <Image src="/vercel.svg" alt="Google for Startups" width={200} height={60} className="h-12 opacity-70 hover:opacity-100 transition" />
                <Image src="/vercel.svg" alt="Aceleratec" width={200} height={60} className="h-12 opacity-70 hover:opacity-100 transition" />
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600">
                Todos los derechos reservados, <span className="text-orange-500 font-bold">TapTap 2025</span>
            </p>
        </div>
      </footer>
    </>
  );
};

export default function Home() {
    return <TapTapPage />;
}