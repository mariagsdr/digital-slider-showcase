
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Globe, Smartphone, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPricingSlide, setCurrentPricingSlide] = useState(0);
  const [currentClientsSlide, setCurrentClientsSlide] = useState(0);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: ''
  });

  // Three.js background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Simple canvas animation without Three.js
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(78, 205, 196, 0.6)';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pricing slider
  const pricingPlans = [
    {
      service: "Gestión de Reseñas Google",
      price: "$299",
      period: "por mes",
      features: [
        "Monitoreo 24/7 de reseñas",
        "Respuesta profesional a reseñas",
        "Estrategia de mejora de reputación",
        "Reporte mensual detallado",
        "Optimización de perfil Google Business",
        "Soporte técnico especializado"
      ]
    },
    {
      service: "Desarrollo Web Profesional",
      price: "$899",
      period: "pago único",
      featured: true,
      badge: "Más Popular",
      features: [
        "Diseño web responsivo moderno",
        "Optimización SEO completa",
        "Certificado SSL incluido",
        "Hosting gratuito 1 año",
        "Mantenimiento 6 meses",
        "Panel de administración",
        "Integración con redes sociales"
      ]
    },
    {
      service: "Gestión de Redes Sociales",
      price: "$499",
      period: "por mes",
      features: [
        "Gestión de 3 plataformas",
        "20 publicaciones mensuales",
        "Diseño gráfico personalizado",
        "Estrategia de contenido",
        "Análisis y reportes",
        "Campañas publicitarias",
        "Community management"
      ]
    },
    {
      service: "Paquete Completo",
      price: "$1,299",
      period: "por mes",
      features: [
        "Todos los servicios incluidos",
        "Desarrollo web + 1 año hosting",
        "Gestión completa de reseñas",
        "Redes sociales premium",
        "Consultoría estratégica",
        "Soporte prioritario 24/7",
        "Descuento del 30%"
      ]
    }
  ];

  const clients = [
    { name: "Restaurante La Parrilla", industry: "Gastronomía", logo: "LP", result: "+300% en reseñas positivas\n4.9 estrellas en Google\n+150% nuevos clientes" },
    { name: "Mendoza Abogados", industry: "Servicios Legales", logo: "MA", result: "Primera página Google\n+200% tráfico web\n+80% consultas online" },
    { name: "Spa Relájate", industry: "Bienestar y Salud", logo: "SR", result: "200% más seguidores\n300% más engagement\n+120% reservas online" },
    { name: "TecnoDigital Solutions", industry: "Tecnología", logo: "TD", result: "Sitio web de alto rendimiento\n+250% conversiones\nSEO posición #1" },
    { name: "Fashion Mode", industry: "Moda y Retail", logo: "FM", result: "+400% ventas online\nInstagram: 50K seguidores\nROI 300%" },
    { name: "Clínica Médica Salud+", industry: "Salud", logo: "CM", result: "Reputación 5 estrellas\n+180% citas online\nPresencia digital sólida" }
  ];

  // Auto-slide for pricing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPricingSlide(prev => (prev + 1) % pricingPlans.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pricingPlans.length]);

  // Auto-slide for clients
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClientsSlide(prev => (prev + 1) % clients.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [clients.length]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would handle the form submission
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ImpulsaTuDigital
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
              <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
              <a href="#precios" className="hover:text-cyan-400 transition-colors">Precios</a>
              <a href="#clientes" className="hover:text-cyan-400 transition-colors">Clientes</a>
              <a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="h-screen relative flex items-center justify-center text-center overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full -z-10"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Impulsa tu Presencia Digital
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
            Transformamos tu negocio con estrategias digitales innovadoras. Gestión de reseñas, desarrollo web profesional y redes sociales que generan resultados reales.
          </p>
          <a 
            href="#contacto" 
            className="inline-block px-12 py-4 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            Comienza tu Transformación Digital
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Star className="w-8 h-8" />, title: "Gestión de Reseñas Google", desc: "Optimizamos y gestionamos tus reseñas para mejorar tu reputación online y aumentar tu visibilidad en las búsquedas locales con estrategias éticas y efectivas." },
              { icon: <Globe className="w-8 h-8" />, title: "Desarrollo Web Profesional", desc: "Creamos sitios web rápidos, seguros y optimizados para SEO que convierten visitantes en clientes, con diseños modernos y adaptados a móviles." },
              { icon: <Smartphone className="w-8 h-8" />, title: "Gestión de Redes Sociales", desc: "Gestión profesional de redes sociales con contenido estratégico, crecimiento orgánico y campañas publicitarias para aumentar tu alcance y engagement." }
            ].map((service, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/10 border border-white/10">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full flex items-center justify-center text-white">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">
            Planes y Precios
          </h2>
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: `translateX(-${currentPricingSlide * 100}%)` }}
            >
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`min-w-full md:min-w-96 bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center border ${plan.featured ? 'border-cyan-400 scale-105' : 'border-white/10'} transition-all duration-300`}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-xl text-cyan-400 font-bold mb-4">{plan.service}</h3>
                  <div className="text-5xl font-bold bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {plan.price}
                  </div>
                  <div className="text-gray-400 mb-8">{plan.period}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-300">
                        <span className="text-cyan-400 mr-3">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    Elegir Plan
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 gap-2">
              {pricingPlans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPricingSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPricingSlide ? 'bg-cyan-400 scale-125' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clientes" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">
            Nuestros Clientes
          </h2>
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: `translateX(-${currentClientsSlide * 100}%)` }}
            >
              {clients.map((client, index) => (
                <div key={index} className="min-w-full md:min-w-80 bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/10 transition-all duration-300 hover:scale-105">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {client.logo}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{client.name}</h3>
                  <p className="text-cyan-400 mb-4">{client.industry}</p>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{client.result}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 gap-2">
              {clients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentClientsSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentClientsSlide ? 'bg-cyan-400 scale-125' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "500+", label: "Clientes Satisfechos" },
              { number: "10,000+", label: "Reseñas Gestionadas" },
              { number: "98%", label: "Tasa de Satisfacción" }
            ].map((stat, index) => (
              <div key={index} className="p-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">
            Lo que Dicen Nuestros Clientes
          </h2>
          <div className="space-y-12">
            {[
              { text: "Desde que comenzamos con ImpulsaTuDigital, nuestras reseñas en Google han aumentado un 300% y ahora tenemos una calificación de 4.9 estrellas. El aumento en clientes nuevos ha sido notable.", author: "María González, Restaurante La Parrilla" },
              { text: "El sitio web que nos desarrollaron superó todas nuestras expectativas. En 3 meses ya estábamos en la primera página de Google para nuestras palabras clave principales.", author: "Carlos Mendoza, CEO Mendoza Abogados" },
              { text: "Nuestras redes sociales han cobrado vida desde que ImpulsaTuDigital las gestiona. Hemos duplicado nuestros seguidores y triplicado el engagement en solo 4 meses.", author: "Ana Rodríguez, Directora Spa Relájate" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                <p className="text-xl italic mb-6 text-gray-300 leading-relaxed">"{testimonial.text}"</p>
                <div className="text-cyan-400 font-bold">- {testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">
              ¿Listo para Impulsar tu Negocio Digital?
            </h2>
            <p className="text-xl text-gray-300">
              Estamos aquí para ayudarte a transformar tu presencia digital y hacer crecer tu negocio.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 mb-12">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-cyan-400 font-bold mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="empresa" className="block text-cyan-400 font-bold mb-2">Nombre de la Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-cyan-400 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-cyan-400 font-bold mb-2">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="servicio" className="block text-cyan-400 font-bold mb-2">Servicio de Interés</label>
                <select
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="reseñas">Gestión de Reseñas Google</option>
                  <option value="web">Desarrollo Web Profesional</option>
                  <option value="redes">Gestión de Redes Sociales</option>
                  <option value="completo">Paquete Completo</option>
                  <option value="consultoria">Consultoría Personalizada</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="mensaje" className="block text-cyan-400 font-bold mb-2">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Cuéntanos sobre tu proyecto y cómo podemos ayudarte..."
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-500 to-cyan-500 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <MapPin className="w-6 h-6" />, title: "Ubicación", content: "Calle Digital 123\nCiudad Tecnológica\nCP 12345" },
              { icon: <Phone className="w-6 h-6" />, title: "Contacto Directo", content: "+1 (555) 123-4567\ninfo@impulsatudigital.com\nWhatsApp: +1 (555) 987-6543" },
              { icon: <Clock className="w-6 h-6" />, title: "Horarios de Atención", content: "Lunes a Viernes: 9:00 AM - 6:00 PM\nSábados: 10:00 AM - 2:00 PM\nRespuesta en 24h" }
            ].map((contact, index) => (
              <div key={index} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 transition-all duration-300 hover:scale-105">
                <div className="flex items-center text-cyan-400 mb-4">
                  {contact.icon}
                  <h4 className="ml-3 font-bold">{contact.title}</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{contact.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
