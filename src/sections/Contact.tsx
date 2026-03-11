import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    privacy: false,
    newsletter: false,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Title animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              titleRef.current,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Form fields animation
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll('.form-field');
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: formRef.current,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                fields,
                { x: -30, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.1,
                  delay: 0.2,
                  ease: 'expo.out',
                }
              );
            },
            once: true,
          })
        );
      }

      // Info animation
      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll('.info-item');
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: infoRef.current,
            start: 'top 80%',
            onEnter: () => {
              gsap.fromTo(
                items,
                { x: 30, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.1,
                  delay: 0.4,
                  ease: 'expo.out',
                }
              );
            },
            once: true,
          })
        );
      }

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Grazie per il tuo messaggio! Ti risponderò al più presto.');
    setFormData({ name: '', email: '', message: '', privacy: false, newsletter: false });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Indirizzo',
      items: [
        'Francesca Violi – P.le Santafiora, 1 – Parma',
        'Fisiocentro – P.le Lalatta, 1 – Sorbolo',
      ],
    },
    {
      icon: Mail,
      title: 'Contatti',
      items: [
        { label: 'Mail:', value: 'info@francescavioli.it', href: 'mailto:info@francescavioli.it' },
        { label: 'Tel/Sms:', value: '+39 329 9641121', href: 'tel:+393299641121' },
        { label: 'WhatsApp:', value: '329 9641121', href: 'https://wa.me/393299641121' },
        { label: 'Skype:', value: 'francesca.violi3', href: 'skype:francesca.violi3' },
      ],
    },
    {
      icon: Phone,
      title: 'Orari',
      items: [
        'In presenza: Su Appuntamento',
        'Chiamare da Lunedì a Venerdì dalle 8 alle 20',
        'Online: Su appuntamento da remoto con Skype/Zoom/Whatsapp',
      ],
    },
  ];

  return (
    <section
      id="contatti"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl text-center mb-16 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          Contatti
        </h2>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form Side */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="form-field opacity-0" style={{ willChange: 'transform, opacity' }}>
                <label htmlFor="name" className="block text-sm text-black/60 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] outline-none transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-field opacity-0" style={{ willChange: 'transform, opacity' }}>
                <label htmlFor="email" className="block text-sm text-black/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] outline-none transition-all"
                  required
                />
              </div>

              {/* Message */}
              <div className="form-field opacity-0" style={{ willChange: 'transform, opacity' }}>
                <label htmlFor="message" className="block text-sm text-black/60 mb-2">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="form-field opacity-0" style={{ willChange: 'transform, opacity' }}>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    className="mt-1 w-4 h-4 border border-gray-300 rounded focus:ring-[#C9A962] text-[#C9A962] cursor-pointer"
                    required
                  />
                  <span className="text-sm text-black/60">
                    Ho letto e accetto l'
                    <a href="#" className="text-[#C9A962] hover:underline">
                      informativa sulla privacy
                    </a>
                  </span>
                </label>
              </div>

              {/* Newsletter Checkbox */}
              <div className="form-field opacity-0" style={{ willChange: 'transform, opacity' }}>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                    className="mt-1 w-4 h-4 border border-gray-300 rounded focus:ring-[#C9A962] text-[#C9A962] cursor-pointer"
                  />
                  <span className="text-sm text-black/60">
                    Desidero iscrivermi alla newsletter
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-field opacity-0" style={{ willChange: 'transform, opacity' }}>
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                >
                  Invia
                </button>
              </div>
            </form>
          </div>

          {/* Info Side */}
          <div ref={infoRef} className="lg:col-span-2 space-y-8">
            {contactInfo.map((section, index) => (
              <div
                key={index}
                className="info-item opacity-0"
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-cream rounded-full">
                    <section.icon size={18} className="text-[#C9A962]" />
                  </div>
                  <h3 className="font-display text-xl text-black/90">{section.title}</h3>
                </div>
                <div className="space-y-2 pl-13">
                  {section.items.map((item: any, i: number) => (
                    <div key={i} className="text-black/60 text-sm">
                      {typeof item === 'string' ? (
                        <p>{item}</p>
                      ) : (
                        <p>
                          {item.label && <span>{item.label} </span>}
                          <a
                            href={item.href}
                            className="text-[#C9A962] hover:underline"
                          >
                            {item.value}
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Link */}
            <div
              className="info-item opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              <a
                href="https://www.facebook.com/francescaviolipsicoterapeutapsicosomatica/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-black/60 hover:text-[#C9A962] transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-cream rounded-full">
                  <Facebook size={18} className="text-[#C9A962]" />
                </div>
                <span className="text-sm">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
