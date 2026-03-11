import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'PSICOTERAPIA',
    subtitle: 'ECOBIOPSICOLOGICA',
    description: 'Un percorso terapeutico che integra la dimensione psicologica con quella corporea e naturale.',
    link: '#',
  },
  {
    title: 'COUNSELING',
    subtitle: 'PSICOSOMATICO',
    description: 'Supporto per affrontare momenti di difficoltà e trovare nuovi equilibri.',
    link: '#',
  },
  {
    title: 'EMDR MINDFULNESS',
    subtitle: 'COSTELLAZIONI',
    description: 'Tecniche evolutive per il benessere psicofisico e la risoluzione dei traumi.',
    link: '#',
  },
  {
    title: 'SOGNI SCRITTURA',
    subtitle: 'BIOGRAFIA ARTI',
    description: 'Strumenti creativi per esplorare l\'inconscio e raccontare la propria storia.',
    link: '#',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Title animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 85%',
          onEnter: () => {
            if (titleRef.current) {
              const chars = titleRef.current.querySelectorAll('.char');
              gsap.fromTo(
                chars,
                { y: '100%', opacity: 0 },
                {
                  y: '0%',
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.05,
                  ease: 'expo.out',
                }
              );
            }
          },
          once: true,
        })
      );

      // Cards flip animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: 'top 85%',
              onEnter: () => {
                gsap.fromTo(
                  card,
                  {
                    rotateY: index % 2 === 0 ? -90 : 90,
                    opacity: 0,
                  },
                  {
                    rotateY: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3 + index * 0.15,
                    ease: 'expo.out',
                  }
                );
              },
              once: true,
            })
          );
        }
      });

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    });

    return () => ctx.revert();
  }, []);

  // Split title into characters
  const titleText = 'Cosa offro';
  const titleChars = titleText.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section
      id="cosa-offro"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl text-center mb-16 overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {titleChars}
        </h2>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative bg-cream p-8 md:p-10 rounded-lg transition-all duration-500 hover:-translate-y-4 hover:shadow-xl cursor-pointer opacity-0"
              style={{
                perspective: '800px',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                transform: `rotate(${index % 2 === 0 ? '-1' : '1'}deg)`,
              }}
            >
              {/* Card Content */}
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl mb-1 text-black/90">
                  {service.title}
                </h3>
                <p className="font-display text-lg md:text-xl text-[#C9A962] mb-4">
                  {service.subtitle}
                </p>
                <p className="text-black/60 text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>
                <a
                  href={service.link}
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-black/70 group-hover:text-[#C9A962] transition-colors"
                >
                  Scopri di più
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-2 transition-transform"
                  />
                </a>
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#C9A962]/20 group-hover:border-[#C9A962]/50 transition-colors" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#C9A962]/20 group-hover:border-[#C9A962]/50 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[#C9A962]/10 rounded-full" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#C9A962]/10 rounded-full" />
    </section>
  );
}
