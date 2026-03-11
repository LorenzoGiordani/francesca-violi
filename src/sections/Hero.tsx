import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle zoom on background
      gsap.fromTo(
        bgRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 15, ease: 'none' }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'expo.out' }
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, { y: self.progress * -60 });
          }
          if (contentRef.current) {
            gsap.set(contentRef.current, { 
              y: self.progress * 30,
              opacity: 1 - self.progress * 0.8
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('https://www.francescavioli.it/wp-content/uploads/2022/09/sun_marenuvole.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6 pt-20"
        style={{ willChange: 'transform, opacity' }}
      >
        <h1 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.25em] mb-6 text-white/95">
          PSICOLOGA PSICOTERAPEUTA ECOBIOPSICOLOGIA
        </h1>

        <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic font-light max-w-4xl mb-3 text-white">
          "Le nuvole non possono annientare il Sole"
        </p>

        <span className="text-base md:text-lg font-light tracking-wider text-white/80">
          F. Battiato
        </span>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
