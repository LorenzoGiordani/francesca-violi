import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<SVGRectElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Frame draw animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (frameRef.current) {
              const length = frameRef.current.getTotalLength();
              gsap.fromTo(
                frameRef.current,
                { strokeDasharray: length, strokeDashoffset: length },
                { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }
              );
            }
          },
          once: true,
        })
      );

      // Image reveal
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: imageRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              imageRef.current,
              { scale: 1.1, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.8, delay: 0.4, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Image parallax
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (imageRef.current) {
              gsap.set(imageRef.current, {
                y: (self.progress - 0.5) * 60,
              });
            }
          },
        })
      );

      // Content entrance
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              contentRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Paragraphs stagger
      paragraphsRef.current.forEach((p, index) => {
        if (p) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: p,
              start: 'top 90%',
              onEnter: () => {
                gsap.fromTo(
                  p,
                  { y: 30, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.5 + index * 0.15,
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

  const bioParagraphs = [
    {
      text: 'Sono ',
      highlight: 'Psicologa',
      suffix: ' clinica specializzata in ',
      highlight2: 'Psicoterapia Ecobiopsicologica',
      suffix2: ', ad orientamento psicodinamico e psicosomatico.',
    },
    {
      text: 'Mi laureo in ',
      highlight: 'Psicologia',
      suffix: ', all\'Università di Parma e successivamente mi perfeziono in Psicologia Giuridica e Psicopatologia delle Condotte Criminali, nello stesso anno in cui mi abilitato alla professione di psicologo.',
    },
    {
      text: 'Sono regolarmente ',
      highlight: 'iscritta all\'Ordine degli Psicologi dell\'Emilia-Romagna n.5764A',
      suffix: '.',
    },
    {
      text: 'Nel 2010 mi specializzo in ',
      highlight: 'psicoterapia Ecobiopsicologica',
      suffix: ' e pubblico il mio primo libro ',
      highlight2: 'Lilith. Risveglio di un\'ombra.',
      suffix2: ', Persiani Ed., Bologna, 2010, sull\'archetipo di Lilith.',
    },
    {
      text: 'Nel 2014 conseguo l\'abilitazione all\'utilizzo della metodologia ',
      highlight: 'EMDR',
      suffix: ' (Desensibilizzazione e Rielaborazione attraverso i Movimenti Oculari) ed esperto in ',
      highlight2: 'tecniche di rilassamento',
      suffix2: ' e meditazione ',
      highlight3: 'Mindfulness',
      suffix3: '.',
    },
  ];

  return (
    <section
      id="chi-sono"
      ref={sectionRef}
      className="section-padding bg-cream relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Decorative Frame */}
            <svg
              className="absolute -inset-4 md:-inset-6 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)] h-[calc(100%+2rem)] md:h-[calc(100%+3rem)] pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <rect
                ref={frameRef}
                x="1"
                y="1"
                width="98"
                height="98"
                fill="none"
                stroke="#C9A962"
                strokeWidth="0.5"
                rx="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Image */}
            <div
              ref={imageRef}
              className="relative aspect-[3/4] overflow-hidden rounded-lg opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              <img
                src="https://www.francescavioli.it/wp-content/uploads/2022/09/122.jpg"
                alt="Francesca Violi - Psicologa Psicoterapeuta"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-[#C9A962]/30 rounded-full" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#C9A962]/10 rounded-full" />
          </div>

          {/* Content Side */}
          <div ref={contentRef} className="opacity-0" style={{ willChange: 'transform, opacity' }}>
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-black/90">
              Chi sono
            </h2>

            <div className="space-y-4 mb-8">
              {bioParagraphs.map((para, index) => (
                <p
                  key={index}
                  ref={(el) => { paragraphsRef.current[index] = el; }}
                  className="text-base md:text-lg leading-relaxed text-black/80 opacity-0"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {para.text && <span>{para.text}</span>}
                  {para.highlight && (
                    <span className="font-medium text-[#C9A962]">{para.highlight}</span>
                  )}
                  {para.suffix && <span>{para.suffix}</span>}
                  {para.highlight2 && (
                    <span className="font-medium text-[#C9A962]">{para.highlight2}</span>
                  )}
                  {para.suffix2 && <span>{para.suffix2}</span>}
                  {para.highlight3 && (
                    <span className="font-medium text-[#C9A962]">{para.highlight3}</span>
                  )}
                  {para.suffix3 && <span>{para.suffix3}</span>}
                </p>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contatti"
              className="btn-primary inline-flex group"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Leggi di più
              <ArrowRight
                size={16}
                className="ml-2 transform group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
