import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const beliefs = [
  {
    text: 'Mi ispiro al',
    highlight: '«Conosci te stesso»',
    suffix: 'del tempio di Apollo a Delfi, e promuovo la conoscenza di Sé come via per l\'equilibrio, il benessere e la salute.',
  },
  {
    text: 'Credo nell\'',
    highlight: 'inseparabilità di mente e corpo',
    suffix: 'e di',
    highlight2: 'uomo e Natura',
    suffix2: ', così come le scienze ci confermano nei loro recenti studi.',
  },
  {
    text: 'Credo che tutto sia interrelato.',
  },
  {
    text: 'Credo che il',
    highlight: 'cambiamento venga da dentro',
    suffix: '.',
  },
  {
    text: 'Credo nel',
    highlight: 'potere trasformativo della parola e della relazione',
    suffix: '.',
  },
  {
    text: 'Ho una',
    highlight: 'visione sistemico complessa',
    suffix: 'e vedo l\'',
    highlight2: 'uomo',
    suffix2: ', nella sua',
    highlight3: 'unicità',
    suffix3: ',',
  },
  {
    text: '',
    highlight: 'come simbolo',
    suffix: 'dell\'Universo.',
  },
  {
    text: 'Pongo',
    highlight: 'la persona al centro',
    suffix: 'integrando nel mio lavoro di',
    highlight2: 'psicoterapia',
    suffix2: 'o di',
    highlight3: 'counseling',
    suffix3: 'una vasta gamma di competenze e strumenti.',
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Line grow animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              lineRef.current,
              { scaleY: 0 },
              { scaleY: 1, duration: 1, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Items stagger reveal
      itemsRef.current.forEach((item, index) => {
        if (item) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: item,
              start: 'top 85%',
              onEnter: () => {
                gsap.fromTo(
                  item,
                  { x: -30, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1,
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

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-cream relative overflow-hidden"
    >
      {/* Decorative Vertical Line */}
      <div
        ref={lineRef}
        className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-[#C9A962] to-transparent origin-top"
        style={{ willChange: 'transform' }}
      />

      <div className="container-narrow relative">
        <div className="space-y-6 md:space-y-8">
          {beliefs.map((belief, index) => (
            <p
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="text-lg md:text-xl lg:text-2xl leading-relaxed text-black/90 opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              {belief.text && <span>{belief.text} </span>}
              {belief.highlight && (
                <span className="font-medium text-[#C9A962]">{belief.highlight}</span>
              )}
              {belief.suffix && <span> {belief.suffix}</span>}
              {belief.highlight2 && (
                <span className="font-medium text-[#C9A962]"> {belief.highlight2}</span>
              )}
              {belief.suffix2 && <span> {belief.suffix2}</span>}
              {belief.highlight3 && (
                <span className="font-medium text-[#C9A962]"> {belief.highlight3}</span>
              )}
              {belief.suffix3 && <span> {belief.suffix3}</span>}
            </p>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-[#C9A962]/20 rounded-full animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-12 h-12 border border-[#C9A962]/10 rounded-full"
        style={{ animation: 'floatOrganic 15s ease-in-out infinite' }}
      />
    </section>
  );
}
