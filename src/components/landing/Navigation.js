'use client';

import { useEffect, useRef } from 'react';

export default function Navigation() {
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
  );
}
