import Image from 'next/image';

export default function Hero() {
  return (
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
  );
}
