import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Image parallax
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (imageRef.current) {
              const img = imageRef.current.querySelector('img');
              if (img) {
                gsap.set(img, {
                  y: (self.progress - 0.5) * 100,
                  scale: 1.1 - self.progress * 0.1,
                });
              }
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
              { x: -80, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Text lines stagger
      textRefs.current.forEach((text, index) => {
        if (text) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: text,
              start: 'top 90%',
              onEnter: () => {
                gsap.fromTo(
                  text,
                  { y: 30, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
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

  const journeyTexts = [
    { text: 'Siamo in', highlight: 'cammino,', suffix: 'in continui cambiamenti e passaggi, in continua ricerca di' },
    { text: '', highlight: 'senso.', suffix: '' },
    { text: 'Siamo in viaggio fuori e dentro di noi, in viaggio per conoscere noi stessi e così cercare il nostro' },
    { text: '', highlight: 'equilibrio.', suffix: '' },
    { text: 'Forse sei qui proprio perché sei in un' },
    { text: '', highlight: 'cambiamento', suffix: 'o in un' },
    { text: '', highlight: 'passaggio.', suffix: '' },
    { text: 'Forse il tuo' },
    { text: '', highlight: 'corpo', suffix: 'ti sta mandando' },
    { text: '', highlight: 'messaggi', suffix: 'a cui devi' },
    { text: '', highlight: 'dare parola e senso.', suffix: '' },
    { text: 'Forse gli eventi che ti stanno accadendo hanno fatto nascere domande in te.' },
    { text: '', highlight: 'Chiedere aiuto è il primo passo verso la comprensione e il recupero di senso.', suffix: '' },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[80vh]">
        {/* Image Side */}
        <div
          ref={imageRef}
          className="relative h-[50vh] lg:h-auto overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://www.francescavioli.it/wp-content/uploads/2024/02/cosa-offro-home.jpg"
              alt="Donna che cammina in un campo di grano al tramonto"
              className="w-full h-full object-cover"
              style={{ willChange: 'transform' }}
            />
          </div>
          {/* Diagonal Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/20 hidden lg:block"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 70% 100%)',
            }}
          />
        </div>

        {/* Content Side */}
        <div className="bg-white py-16 lg:py-24 px-6 md:px-12 lg:px-16 flex flex-col justify-center">
          <div ref={contentRef} className="max-w-xl opacity-0" style={{ willChange: 'transform, opacity' }}>
            <h2 className="font-display text-3xl md:text-4xl mb-8 text-black/90">
              Siamo in <span className="text-[#C9A962]">cammino</span>
            </h2>

            <div className="space-y-1 mb-10">
              {journeyTexts.map((item, index) => (
                <p
                  key={index}
                  ref={(el) => { textRefs.current[index] = el; }}
                  className="text-base md:text-lg leading-relaxed text-black/80 opacity-0"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {item.text && <span>{item.text} </span>}
                  {item.highlight && (
                    <span className="font-medium text-[#C9A962]">{item.highlight}</span>
                  )}
                  {item.suffix && <span> {item.suffix}</span>}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="mb-8">
              <p className="text-base md:text-lg leading-relaxed text-black/80 mb-4">
                Inizia con me un percorso di{' '}
                <span className="font-medium text-[#C9A962]">psicoterapia Ecobiopsicologica</span>,
                ad indirizzo psicosomatico psicodinamico, prenditi uno spazio-tempo dove essere accolta e ascoltata in tutte le tue parti, dove ritrovarti e riprendere il cammino con te stessa, là dove hai smesso di vederti e immaginarti.
              </p>
            </div>

            {/* Phone CTA */}
            <div className="mb-8 p-6 bg-cream rounded-lg">
              <p className="text-sm text-black/60 mb-2">Chiamami per avere informazioni o per fissare il primo appuntamento di Psicoterapia o una consulenza al</p>
              <a
                href="tel:+393299641121"
                className="inline-flex items-center gap-3 text-2xl md:text-3xl font-display text-[#C9A962] hover:scale-105 transition-transform"
              >
                <Phone size={28} />
                +39 329 9641121
              </a>
            </div>

            {/* Services */}
            <p className="text-base text-black/70 mb-6">
              Offro colloqui <span className="font-medium text-black">individuali</span>, di{' '}
              <span className="font-medium text-black">coppia</span> e{' '}
              <span className="font-medium text-black">supporto alla genitorialità</span>.
            </p>

            {/* Button */}
            <a
              href="#cosa-offro"
              className="btn-primary inline-flex"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#cosa-offro')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Leggi di più
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
